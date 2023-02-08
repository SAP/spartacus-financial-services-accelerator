import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  Address,
  Country,
  Region,
  User,
  UserActions,
  UserAddressService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { ConsentService } from '../../core/my-account/facade/consent.service';
import { FSUser, FSUserRole } from '../../occ/occ-models/occ.models';
import { FSAddressService } from '../../core/user/facade/address.service';
import { Actions, ofType } from '@ngrx/effects';
import { UserAccountFacade } from '@spartacus/user/account/root';

@Component({
  selector: 'cx-fs-user-change-address-dialog',
  templateUrl: './user-change-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserChangeAddressComponent implements OnInit, OnDestroy {
  @Input() customer: FSUser;
  @Input() userId: string;
  @Output() actionChangeBySeller = new EventEmitter<string>();
  @Output() actionChangeByCustomer = new EventEmitter<string>();
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
    protected actions$: Actions,
    protected fb: UntypedFormBuilder,
    protected fSAddressService: FSAddressService,
    protected userAddressService: UserAddressService,
    protected fsConsentService: ConsentService,
    protected userAccountFacade: UserAccountFacade
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
          tap(() => this.actionChangeBySeller.emit('Add'))
        )
        .subscribe()
    );
  }

  cancel() {
    this.actionChangeBySeller.emit();
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

    this.subscription.add(
      this.userAccountFacade
        .get()
        .pipe(take(1))
        .subscribe((user: User) => {
          if (user.roles.includes(FSUserRole.SELLER)) {
            this.changeAddressAsSeller(address);
          } else {
            this.changeAddressAsCustomer(address);
          }
        })
    );
  }

  changeAddressAsSeller(address: Address) {
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
          .subscribe(() => this.actionChangeBySeller.emit('Edit'))
      );
    }
  }

  changeAddressAsCustomer(address: Address) {
    if (!this.customer.defaultAddress) {
      address.defaultAddress = true;
      this.userAddressService.addUserAddress(address);
      this.subscription.add(
        this.actions$
          .pipe(ofType(UserActions.ADD_USER_ADDRESS_SUCCESS), take(1))
          .subscribe(_ => {
            this.actionChangeByCustomer.emit('Add');
          })
      );
    } else {
      this.userAddressService.updateUserAddress(
        this.customer.defaultAddress.id,
        address
      );
      this.subscription.add(
        this.actions$
          .pipe(ofType(UserActions.UPDATE_USER_ADDRESS_SUCCESS), take(1))
          .subscribe(_ => {
            this.actionChangeByCustomer.emit('Edit');
          })
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
