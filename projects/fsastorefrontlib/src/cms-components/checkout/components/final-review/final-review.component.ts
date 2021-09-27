import { Component, Input, OnInit } from '@angular/core';
import {
  PaymentDetails,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSCheckoutService } from '../../../../core/checkout/facade/checkout.service';
import { filter, take } from 'rxjs/operators';
import { CheckoutPaymentService } from '@spartacus/checkout/core';

@Component({
  selector: 'cx-fs-final-review',
  templateUrl: './final-review.component.html',
})
export class FinalReviewComponent implements OnInit {
  @Input()
  paymentDetails$: Observable<PaymentDetails>;
  tAndCToggler = false;
  constructor(
    protected checkoutService: FSCheckoutService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected routingService: RoutingService
  ) {}

  ngOnInit() {
    this.checkoutService.mockDeliveryMode();
    this.paymentDetails$ = this.checkoutPaymentService.getPaymentDetails().pipe(
      filter(payment => !!payment),
      take(1)
    );
  }

  toggleTAndC(): void {
    this.tAndCToggler = !this.tAndCToggler;
  }

  placeOrder(): void {
    this.checkoutService.placeOrder(this.tAndCToggler);
    this.checkoutService.orderPlaced = true;
    this.routingService.go({ cxRoute: 'orderConfirmation' });
  }
}
