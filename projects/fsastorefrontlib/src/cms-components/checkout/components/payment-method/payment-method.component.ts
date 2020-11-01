import { Component, OnInit } from '@angular/core';
import {
  PaymentMethodComponent,
  CheckoutStepService,
} from '@spartacus/storefront';
import {
  UserPaymentService,
  CheckoutService,
  CheckoutDeliveryService,
  CheckoutPaymentService,
  GlobalMessageService,
  TranslationService,
  ActiveCartService,
} from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cx-fs-payment-method',
  templateUrl: './payment-method.component.html',
})
export class FSPaymentMethodComponent extends PaymentMethodComponent {
  constructor(
    protected userPaymentService: UserPaymentService,
    protected checkoutService: CheckoutService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected globalMessageService: GlobalMessageService,
    protected activatedRoute: ActivatedRoute,
    protected translation: TranslationService,
    protected activeCartService: ActiveCartService,
    protected checkoutStepService: CheckoutStepService
  ) {
    super(
      userPaymentService,
      checkoutService,
      checkoutDeliveryService,
      checkoutPaymentService,
      globalMessageService,
      activatedRoute,
      translation,
      activeCartService,
      checkoutStepService
    );
  }
  selectedPaymentMethod: String;
}
