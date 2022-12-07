import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Address, Country, Region, UserAddressService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ConsentService } from '../../core/my-account/facade/consent.service';
import { FSUser } from '../../occ/occ-models/occ.models';
import { FSAddressService } from '../../core/user/facade/address.service';

@Component({
  selector: 'cx-fs-user-change-address-dialog',
  templateUrl: './user-change-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserChangeAddressComponent implements OnInit, OnDestroy {
  @Input() customer: FSUser;
  @Input() userId: string;
  @Output() actionChange = new EventEmitter<string>();
  private subscription = new Subscription();
  countries$: Observable<Country[]>;
  regions$: Observable<Region[]>;
  addressForm: UntypedFormGroup = this.fb.group({
    country: this.fb.group({
      isocode: [null, Validators.required],
    }),
    line1: ['', [Validators.required]],
    line2: [''],
    town: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    region: this.fb.group({
      isocode: [null, Validators.required],
    }),
  });

  constructor(
    protected fb: UntypedFormBuilder,
    protected fSAddressService: FSAddressService,
    protected userAddressService: UserAddressService,
    protected fsConsentService: ConsentService
  ) {}

  ngOnInit(): void {
    if (this.customer?.defaultAddress) {
      this.addressForm.patchValue(this.customer?.defaultAddress);
      this.fsConsentService.setSelectedCountry(
        this.addressForm.get('country.isocode').value
      );
    }
    this.countries$ = this.fSAddressService.getCountries();
    this.regions$ = this.fsConsentService.selectedCountry$.pipe(
      switchMap(country => this.userAddressService.getRegions(country)),
      tap(regions => {
        const regionControl = this.addressForm.get('region.isocode');
        if (regions && regions.length > 0) {
          regionControl.enable();
        } else {
          regionControl.disable();
        }
      })
    );
    this.notifyAddedAddress();
  }

  notifyAddedAddress() {
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
    this.fsConsentService.setSelectedCountry(country.isocode);
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
