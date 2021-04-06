import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CheckoutDeliveryService,
  Country,
  GlobalMessageService,
  User,
  UserAddressService,
  UserService,
} from '@spartacus/core';
import { AddressFormComponent, ModalService } from '@spartacus/storefront';
import { filter, map } from 'rxjs/operators';
import { OccValueListService } from '../../../../occ/services/value-list/occ-value-list.service';

@Component({
  selector: 'cx-fs-address-form',
  templateUrl: './address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSAddressFormComponent extends AddressFormComponent
  implements OnInit {
  @Input()
  user: User;

  addressForm: FormGroup = this.fb.group({
    country: this.fb.group({
      isocode: [null, Validators.required],
    }),
    firstName: [{ value: '', disabled: true }, Validators.required],
    lastName: [{ value: '', disabled: true }, Validators.required],
    line1: ['', Validators.required],
    line2: [''],
    town: ['', Validators.required],
    region: this.fb.group({
      isocode: [null, Validators.required],
    }),
    postalCode: ['', Validators.required],
    defaultAddress: [true],
  });

  countriesURL = '/catalogs/financialProductCatalog/valueLists/country';

  constructor(
    protected fb: FormBuilder,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected userService: UserService,
    protected userAddressService: UserAddressService,
    protected globalMessageService: GlobalMessageService,
    protected modalService: ModalService,
    protected occValueListService: OccValueListService
  ) {
    super(
      fb,
      checkoutDeliveryService,
      userService,
      userAddressService,
      globalMessageService,
      modalService
    );
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.user?.firstName) {
      this.addressForm.controls.firstName.setValue(this.user.firstName);
    }
    if (this.user?.lastName) {
      this.addressForm.controls.lastName.setValue(this.user.lastName);
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
  }

  verifyAddress(): void {
    this.preventDOMManipulation();
    this.addressForm.get('firstName').enable();
    this.addressForm.get('lastName').enable();
    super.verifyAddress();
  }

  protected preventDOMManipulation() {
    if (this.addressForm.get('firstName').value !== this.user.firstName) {
      this.addressForm.get('firstName').setValue(null);
    }
    if (this.addressForm.get('lastName').value !== this.user.lastName) {
      this.addressForm.get('lastName').setValue(null);
    }
  }
}
