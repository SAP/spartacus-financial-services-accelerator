import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActiveCartService,
  GlobalMessageService,
  PaymentDetails,
  PaymentType,
  RoutingService,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FSPaymentTypeEnum, FSSteps } from '../../../../occ/occ-models';
import { FSCheckoutConfigService } from '../../../../core/checkout/services';
import { filter, map, take, tap } from 'rxjs/operators';
import { FSCheckoutService } from '../../../../core/checkout/facade';
import {
  CheckoutDeliveryService,
  CheckoutPaymentService,
  PaymentTypeService,
} from '@spartacus/checkout/core';
import {
  CheckoutStepService,
  PaymentMethodComponent,
} from '@spartacus/checkout/components';

@Component({
  selector: 'cx-fs-payment-method',
  templateUrl: './payment-method.component.html',
})
export class FSPaymentMethodComponent extends PaymentMethodComponent
  implements OnInit, OnDestroy {
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
      checkoutStepService
    );
  }
  NOT_ALLOWED_PAYMENTS = ['ACCOUNT'];
  paymentTypes$: Observable<PaymentType[]>;
  paymentType$: Observable<string>;
  previousCheckoutStep$: Observable<FSSteps>;
  nextCheckoutStep$: Observable<FSSteps>;
  subscription = new Subscription();
  paymentDetails$: Observable<PaymentDetails>;
  creditCard = FSPaymentTypeEnum.CARD;

  ngOnInit(): void {
    super.ngOnInit();
    // TODO: Remove once the checkout state is updated with delivery address saved on backend
    this.subscription
      .add(
        this.activeCartService
          .getActive()
          .pipe(
            filter(cart => !!cart),
            map(cart => {
              this.checkoutService.loadCheckoutDetails(cart.code);
            })
          )
          .subscribe()
      )
      .add(
        this.checkoutDeliveryService
          .getDeliveryAddress()
          .pipe(
            map(address => {
              this.deliveryAddress = address;
            })
          )
          .subscribe()
      );
    this.paymentTypeService.loadPaymentTypes();
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;
    this.paymentDetails$ = this.checkoutPaymentService
      .getPaymentDetails()
      .pipe(filter(payment => !!payment));

    this.paymentTypes$ = this.paymentTypeService.getPaymentTypes().pipe(
      filter(paymentTypes => paymentTypes.length > 0),
      take(1),
      map(paymentTypes => {
        const filteredPayments = paymentTypes.filter(
          item => !this.NOT_ALLOWED_PAYMENTS.some(key => key === item.code)
        );
        return filteredPayments;
      })
    );
    this.paymentType$ = this.checkoutService.getPaymentType();
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
    this.checkoutService.setPaymentType(code);
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
