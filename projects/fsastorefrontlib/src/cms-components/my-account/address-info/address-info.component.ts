import { Component, OnInit } from '@angular/core';
import {
  CheckoutDeliveryService,
  TranslationService,
  User,
  UserAddressService,
  UserService,
} from '@spartacus/core';
import {
  AddressBookComponent,
  AddressBookComponentService,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './address-info.component.html',
})
export class FSAddressInfoComponent extends AddressBookComponent
  implements OnInit {
  user$: Observable<User>;

  constructor(
    public service: AddressBookComponentService,
    protected translation: TranslationService,
    protected userAddressService: UserAddressService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected userService: UserService
  ) {
    super(service, translation, userAddressService, checkoutDeliveryService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.user$ = this.userService.get();
  }
}
