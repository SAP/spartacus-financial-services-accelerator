import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, Country, Region, UserAddressService } from '@spartacus/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { OccValueListService } from '../../occ/services/value-list/occ-value-list.service';
import { ConsentService } from '../../core/my-account/facade/consent.service';
import { FSUser } from '../../occ/occ-models/occ.models';

@Component({
  selector: 'cx-fs-user-change-address-dialog',
  templateUrl: './user-change-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserChangeAddressComponent implements OnInit, OnDestroy {
  @Input() customer: FSUser;
  @Input() userId: string;
  @Output() actionChange = new EventEmitter<string>();
  addressForm: FormGroup = this.fb.group({
    country: this.fb.group({
      isocode: [null, Validators.required],
    }),
    line1: ['', [Validators.required]],
    line2: [''],
    town: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
  });
  countriesURL = '/catalogs/financialProductCatalog/valueLists/country';
  countries$: Observable<Country[]>;
  selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  regions$: Observable<Region[]>;
  private subscription = new Subscription();

  constructor(
    protected fb: FormBuilder,
    protected occValueListService: OccValueListService,
    protected userAddressService: UserAddressService,
    protected fsConsentService: ConsentService
  ) {}

  ngOnInit(): void {
    if (this.customer?.defaultAddress) {
      this.addressForm.patchValue(this.customer?.defaultAddress);
      this.selectedCountry$.next(this.addressForm.get('country.isocode').value);
    }
    this.countries$ = this.occValueListService
      .getValuesFromAPI(this.countriesURL)
      .pipe(
        filter(result => result.values),
        map(result => {
          const options: Country[] = [];
          result.values.forEach(item => {
            options.push({
              name: item.value,
              isocode: item.key,
            });
          });
          return options;
        })
      );
    this.regions$ = this.selectedCountry$.pipe(
      switchMap(country => this.userAddressService.getRegions(country)),
      tap(regions => {
        if (regions.length > 0) {
          this.addressForm.addControl(
            'region',
            this.fb.group({
              isocode: [
                this.customer?.defaultAddress?.region?.isocode,
                Validators.required,
              ],
            })
          );
        } else {
          this.addressForm.removeControl('region');
        }
      })
    );
    this.subscription.add(
      this.fsConsentService.userAddressAdded$
        .pipe(
          filter(addedAddress => !!addedAddress),
          tap(() => this.actionChange.emit('Add'))
        )
        .subscribe()
    );
  }

  cancel() {
    this.actionChange.emit();
  }

  countrySelected(country: Country): void {
    this.addressForm.get('country.isocode').setValue(country.isocode);
    this.selectedCountry$.next(country.isocode);
  }

  changeAddress() {
    if (!this.addressForm.valid) {
      this.addressForm.markAllAsTouched();
      return;
    }
    const address: Address = Object.assign(this.addressForm.value);
    address.firstName = this.customer.firstName;
    address.lastName = this.customer.lastName;
    if (!this.customer.defaultAddress) {
      this.fsConsentService.createAddressForUser(
        this.userId,
        this.customer.uid,
        address
      );
    } else {
      this.subscription.add(
        this.fsConsentService
          .updateAddressForUser(
            this.userId,
            this.customer.uid,
            this.customer.defaultAddress.id,
            address
          )
          .subscribe(() => this.actionChange.emit('Edit'))
      );
    }
  }

  ngOnDestroy(): void {
    this.fsConsentService.setUserAddressAdded(false);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
