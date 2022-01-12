import { Component, OnInit } from '@angular/core';
import {
  CheckoutStepService,
  PaymentMethodComponent as CorePaymentMethodComponent,
} from '@spartacus/checkout/components';
import {
  UserPaymentService,
  GlobalMessageService,
  TranslationService,
  ActiveCartService,
  PaymentDetails,
} from '@spartacus/core';
import {
  CheckoutService,
  CheckoutDeliveryService,
  CheckoutPaymentService,
} from '@spartacus/checkout/core';
import { ActivatedRoute } from '@angular/router';
export const DP_CARD_REGISTRATION_STATUS = 'x-card-registration-status';

@Component({
  selector: 'cx-fs-digital-payment-credit-card',
  templateUrl: './digital-payment-credit-card.component.html',
})
export class FSDigitalPaymentCreditCardComponent
  extends CorePaymentMethodComponent
  implements OnInit {
  showCallbackScreen = false;

  isDpCallback(): boolean {
    const queryParams = this.activatedRoute.snapshot.queryParamMap.get(
      DP_CARD_REGISTRATION_STATUS
    );
    if (queryParams) {
      return true;
    } else {
      return false;
    }
  }

  hideCallbackScreen(): void {
    this.showCallbackScreen = false;
  }

  paymentDetailsAdded(paymentDetails: PaymentDetails) {
    this.selectPaymentMethod(paymentDetails);
    this.next();
  }

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
    this.showCallbackScreen = this.isDpCallback();
  }

  // ngOnInit(): void {
  //   super.ngOnInit();
  //   this.cards$.subscribe(console.log);
  //   console.log(
  //     this.newPaymentFormManuallyOpened,
  //     'newPaymentFormManuallyOpened'
  //   );
  // }
}
