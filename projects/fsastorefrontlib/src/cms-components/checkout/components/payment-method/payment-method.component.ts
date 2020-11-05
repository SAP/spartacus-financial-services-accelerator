import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CheckoutStepService,
  PaymentMethodComponent,
} from '@spartacus/storefront';
import {
  ActiveCartService,
  CheckoutDeliveryService,
  CheckoutPaymentService,
  CheckoutService,
  GlobalMessageService,
  RoutingService,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FSSteps } from '../../../../occ/occ-models';
import { FSCheckoutConfigService } from '../../../../core/checkout/services';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-fs-payment-method',
  templateUrl: './payment-method.component.html',
})
export class FSPaymentMethodComponent extends PaymentMethodComponent
  implements OnInit, OnDestroy {
  constructor(
    protected userPaymentService: UserPaymentService,
    protected checkoutService: CheckoutService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected globalMessageService: GlobalMessageService,
    protected activatedRoute: ActivatedRoute,
    protected translation: TranslationService,
    protected activeCartService: ActiveCartService,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutConfigService: FSCheckoutConfigService,
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
      checkoutStepService
    );
  }
  selectedPaymentMethod: String;
  previousCheckoutStep$: Observable<FSSteps>;
  nextCheckoutStep$: Observable<FSSteps>;
  subscription = new Subscription();

  ngOnInit(): void {
    super.ngOnInit();
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;
  }

  navigateBack(previousStep: FSSteps) {
    this.routingService.go({
      cxRoute: previousStep.step,
      params: { code: previousStep.stepParameter },
    });
  }

  navigateNext(nextStep: FSSteps) {
    this.subscription.add(
      this.checkoutPaymentService
        .getPaymentDetails()
        .pipe(
          filter(payment => !!payment),
          take(1),
          tap(payment => {
            this.routingService.go({
              cxRoute: nextStep.step,
            });
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
