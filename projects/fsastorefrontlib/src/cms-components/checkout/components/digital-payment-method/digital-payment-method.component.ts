import { Component } from '@angular/core';
import {
  ActiveCartService,
  GlobalMessageService,
  RoutingService,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import {
  CheckoutDeliveryService,
  CheckoutPaymentService,
  PaymentTypeService,
} from '@spartacus/checkout/core';
import { CheckoutStepService } from '@spartacus/checkout/components';
import { FSCheckoutService } from '../../../../core/checkout/facade/checkout.service';
import { FSPaymentMethodComponent } from '../payment-method/payment-method.component';
import { ActivatedRoute } from '@angular/router';
import { FSCheckoutConfigService } from '../../../../core/checkout/services/checkout-config.service';

@Component({
  selector: 'cx-fs-digital-payment-method',
  templateUrl: './digital-payment-method.component.html',
})
export class FSDigitalPaymentMethodComponent extends FSPaymentMethodComponent {
  constructor(
    protected userPaymentService: UserPaymentService,
    protected checkoutService: FSCheckoutService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected globalMessageService: GlobalMessageService,
    protected activatedRoute: ActivatedRoute,
    protected translation: TranslationService,
    protected activeCartService: ActiveCartService,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected paymentTypeService: PaymentTypeService,
    protected routingService: RoutingService
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
      checkoutStepService,
      checkoutConfigService,
      paymentTypeService,
      routingService
    );
    this.userPaymentService.loadPaymentMethods();
  }
}
