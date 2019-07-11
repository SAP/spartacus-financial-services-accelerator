import { Component } from '@angular/core';
import {
  UserService,
  CartDataService,
  Address,
  CheckoutService,
  UserPaymentService,
  CheckoutDeliveryService,
  CheckoutPaymentService,
  GlobalMessageService,
  RoutingService,
  TranslationService} from '@spartacus/core';
import { ɵc as CheckoutConfigService, PaymentMethodComponent } from '@spartacus/storefront';
import * as fromCheckout from '@spartacus/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

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
    protected userService: UserService,
    protected userPaymentService: UserPaymentService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected checkoutConfigService: CheckoutConfigService,
    protected activatedRoute: ActivatedRoute,
    protected translation: TranslationService
  ) {
    super(
      userPaymentService,
      checkoutService,
      checkoutDeliveryService,
      checkoutPaymentService,
      globalMessageService,
      routingService,
      checkoutConfigService,
      activatedRoute,
      translation
      );
    this.mockDeliveryAddress();
  }

  mockDeliveryAddress(): void {
    this.store.dispatch(
      new fromCheckout.SetDeliveryAddressSuccess(this.FSDeliveryAddress));
  }
}
