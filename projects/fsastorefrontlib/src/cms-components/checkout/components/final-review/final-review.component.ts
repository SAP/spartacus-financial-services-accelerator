import { Component, Input, OnInit } from '@angular/core';
import { QueryState, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSCheckoutService } from '../../../../core/checkout/facade/checkout.service';
import { filter, take } from 'rxjs/operators';
import { CheckoutPaymentFacade } from '@spartacus/checkout/base/root';
import { PaymentDetails } from '@spartacus/cart/base/root';
import { OrderFacade } from '@spartacus/order/root';

@Component({
  selector: 'cx-fs-final-review',
  templateUrl: './final-review.component.html',
})
export class FinalReviewComponent implements OnInit {
  @Input()
  paymentDetails$: Observable<QueryState<PaymentDetails | undefined>>;
  tAndCToggler = false;
  constructor(
    protected checkoutService: FSCheckoutService,
    protected checkoutPaymentFacade: CheckoutPaymentFacade,
    protected orderFacade: OrderFacade,
    protected routingService: RoutingService
  ) {}

  ngOnInit() {
    this.checkoutService.mockDeliveryMode();
    this.paymentDetails$ = this.checkoutPaymentFacade
      .getPaymentDetailsState()
      .pipe(
        filter(payment => !!payment),
        take(1)
      );
  }

  toggleTAndC(event: Event): void {
    this.tAndCToggler = (event.target as HTMLInputElement)?.checked;
  }

  placeOrder(): void {
    if (this.tAndCToggler) {
      this.checkoutService.placeOrder(this.tAndCToggler);
      this.checkoutService.orderPlaced = true;
      this.orderFacade.placeOrder(true);
      this.routingService.go({ cxRoute: 'orderConfirmation' });
    }
  }
}
