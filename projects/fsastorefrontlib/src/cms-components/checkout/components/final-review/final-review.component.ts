import { Component, Input, OnInit } from '@angular/core';
import {
  EventService,
  // CheckoutPaymentService,
  PaymentDetails,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSCheckoutService } from '../../../../core/checkout/facade/checkout.service';
import { filter, take } from 'rxjs/operators';
import { CheckoutPaymentFacade } from '@spartacus/checkout/root';

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
    protected checkoutPaymentService: CheckoutPaymentFacade,
    protected routingService: RoutingService,
    protected eventService: EventService
  ) {}

  ngOnInit() {
    this.checkoutService.mockDeliveryMode();
    this.paymentDetails$ = this.checkoutPaymentService.getPaymentDetails().pipe(
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
      this.routingService.go({ cxRoute: 'orderConfirmation' });
    }
  }
}
