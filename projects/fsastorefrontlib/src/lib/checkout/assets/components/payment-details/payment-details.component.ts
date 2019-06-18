import { Component } from '@angular/core';
import { UserService, CartDataService, Address, CheckoutService } from '@spartacus/core';
import { PaymentMethodComponent } from '@spartacus/storefront';
import * as fromCheckout from '@spartacus/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'fsa-payment-details',
  templateUrl: './payment-details.component.html'
})
export class PaymentDetailsComponent extends PaymentMethodComponent {

  private FSDeliveryAddress: Address = {
    country: { 'isocode': 'AT' },
    firstName: 'John',
    lastName: 'Doe',
    defaultAddress: true,
    titleCode: 'mr',
    line1: 'Toyosaki 2',
    town: 'Wien',
    postalCode: '213A',
  };
  constructor(
    protected checkoutService: CheckoutService,
    protected store: Store<fromCheckout.CheckoutState>,
    protected cartData: CartDataService,
    protected userService: UserService
  ) {
    super(null, null, null, null, null, null, null, null, null);
    this.mockDeliveryAddress();
  }

  mockDeliveryAddress(): void {
    this.store.dispatch(
      new fromCheckout.SetDeliveryAddressSuccess(this.FSDeliveryAddress));
  }
}
