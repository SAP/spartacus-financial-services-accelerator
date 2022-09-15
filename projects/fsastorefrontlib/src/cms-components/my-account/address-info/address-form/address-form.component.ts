import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  GlobalMessageService,
  TranslationService,
  User,
  UserAddressService,
  UserService,
} from '@spartacus/core';
import { DefaultFormValidators } from '@spartacus/dynamicforms';
import { AddressFormComponent, ModalService } from '@spartacus/storefront';
import { FSAddressService } from 'projects/fsastorefrontlib/src/core/user/facade/address.service';

@Component({
  selector: 'cx-fs-address-form',
  templateUrl: './address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSAddressFormComponent extends AddressFormComponent
  implements OnInit {
  @Input()
  user: User;
  buttonVisible = true;

  addressForm: FormGroup = this.fb.group({
    country: this.fb.group({
      isocode: [null, Validators.required],
    }),
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    line1: ['', [Validators.required, Validators.maxLength(50)]],
    line2: ['', [Validators.required, Validators.maxLength(50)]],
    town: ['', [Validators.required, Validators.maxLength(50)]],
    region: this.fb.group({
      isocode: [null, Validators.required],
    }),
    postalCode: [
      '',
      [
        Validators.required,
        DefaultFormValidators.alphanumeric,
        Validators.maxLength(15),
      ],
    ],
    defaultAddress: [true],
  });

  constructor(
    protected fb: FormBuilder,
    protected userService: UserService,
    protected userAddressService: UserAddressService,
    protected globalMessageService: GlobalMessageService,
    protected modalService: ModalService,
    protected translationService: TranslationService,
    protected fSAddressService: FSAddressService
  ) {
    super(
      fb,
      userService,
      userAddressService,
      globalMessageService,
      modalService,
      translationService
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
    this.countries$ = this.fSAddressService.getCountries();
  }

  verifyAddress(): void {
    if (this.buttonVisible) {
      this.preventDOMManipulation();
      super.verifyAddress();
    }
    if (this.addressForm.valid) {
      this.buttonVisible = false;
    }
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
