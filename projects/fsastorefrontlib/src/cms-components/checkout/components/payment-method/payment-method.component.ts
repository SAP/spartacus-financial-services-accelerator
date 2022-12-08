import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GlobalMessageService,
  QueryState,
  RoutingService,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import { PaymentDetails } from '@spartacus/cart/base/root';
import { ActiveCartFacade, PaymentType } from '@spartacus/cart/base/root';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FSPaymentTypeEnum, FSSteps } from '../../../../occ/occ-models';
import { FSCheckoutConfigService } from '../../../../core/checkout/services';
import { filter, map, take, tap } from 'rxjs/operators';
import { FSCheckoutService } from '../../../../core/checkout/facade';
import { CheckoutDeliveryAddressFacade, CheckoutPaymentFacade } from '@spartacus/checkout/base/root';
import {
  CheckoutStepService,
} from '@spartacus/checkout/base/components';
import { CheckoutPaymentMethodComponent } from '@spartacus/checkout/base/components';
import { CheckoutPaymentService } from '@spartacus/checkout/base/core';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';

@Component({
  selector: 'cx-fs-payment-method',
  templateUrl: './payment-method.component.html',
})
export class FSPaymentMethodComponent extends CheckoutPaymentMethodComponent
  implements OnInit, OnDestroy {
  constructor(
    protected userPaymentService: UserPaymentService,
    protected fsCheckoutService: FSCheckoutService,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected checkoutPaymentFacade: CheckoutPaymentFacade,
    protected globalMessageService: GlobalMessageService,
    protected activatedRoute: ActivatedRoute,
    protected translationService: TranslationService,
    protected activeCartFacade: ActiveCartFacade,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade,
    protected routingService: RoutingService,
    protected checkoutPaymentService: CheckoutPaymentService
  ) {
    super(
      userPaymentService,
      checkoutDeliveryAddressFacade,
      checkoutPaymentFacade,
      activatedRoute,
      translationService,
      activeCartFacade,
      checkoutStepService,
      globalMessageService
    );
  }
  NOT_ALLOWED_PAYMENTS = ['ACCOUNT'];
  paymentTypes$: Observable<PaymentType[]>;
  paymentType$: Observable<string>;
  previousCheckoutStep$: Observable<FSSteps>;
  nextCheckoutStep$: Observable<FSSteps>;
  subscription = new Subscription();
  paymentDetails$: Observable<QueryState<PaymentDetails | undefined>>;
  creditCard = FSPaymentTypeEnum.CARD;

  ngOnInit(): void {
    super.ngOnInit();
    // TODO: Remove once the checkout state is updated with delivery address saved on backend
    this.subscription
      .add(
        this.activeCartFacade
          .getActive()
          .pipe(
            filter(cart => !!cart),
            map(cart => {
              this.fsCheckoutService.loadCheckoutDetails(cart.code);
            })
          )
          .subscribe()
      )
      .add(
        this.checkoutDeliveryAddressFacade
          .getDeliveryAddressState()
          .pipe(
            map(address => {
              this.deliveryAddress = address.data;
            })
          )
          .subscribe()
      );
    this.checkoutPaymentTypeFacade.getPaymentTypes();
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;
    this.paymentDetails$ = this.checkoutPaymentService
      .getPaymentDetailsState()
      .pipe(filter(payment => !!payment));

    this.paymentTypes$ = this.checkoutPaymentTypeFacade.getPaymentTypes().pipe(
      filter(paymentTypes => paymentTypes.length > 0),
      take(1),
      map(paymentTypes => {
        const filteredPayments = paymentTypes.filter(
          item => !this.NOT_ALLOWED_PAYMENTS.some(key => key === item.code)
        );
        return filteredPayments;
      })
    );
    this.paymentType$ = this.fsCheckoutService.getPaymentType();
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
        .getPaymentDetailsState()
        .pipe(
          filter(payment => !!payment),
          tap(_ => {
            this.routingService.go({
              cxRoute: nextStep.step,
            });
          })
        )
        .subscribe()
    );
  }

  changeType(code: string) {
    this.fsCheckoutService.setPaymentType(code);
    if (code === FSPaymentTypeEnum.INVOICE) {
      this.selectPaymentMethod({ id: code });
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showNavigation(
    cards: any,
    newPaymentFormManuallyOpened: boolean,
    payment: any
  ) {
    return (
      (cards?.length > 0 && !newPaymentFormManuallyOpened) ||
      ((!newPaymentFormManuallyOpened || payment.paymentDetails.id) &&
        payment.paymentType !== this.creditCard) ||
      (!newPaymentFormManuallyOpened &&
        payment.paymentType === this.creditCard &&
        payment.paymentDetails?.cardNumber)
    );
  }
}
