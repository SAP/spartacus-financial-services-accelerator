import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CheckoutPaymentService,
  PaymentDetails,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSCheckoutService } from '../../../../core/checkout/facade/checkout.service';
import { FSCheckoutConfigService } from '../../../../core/checkout/services/checkout-config.service';

@Component({
  selector: 'cx-fs-final-review',
  templateUrl: './final-review.component.html',
})
export class FinalReviewComponent implements OnInit {
  @Input()
  paymentDetails$: Observable<PaymentDetails>;
  @Output()
  goToQuoteReview = new EventEmitter<any>();
  tAndCToggler = false;
  constructor(
    protected checkoutService: FSCheckoutService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected activatedRoute: ActivatedRoute
  ) {}

  checkoutStepUrlNext: string;

  ngOnInit() {
    this.checkoutService.mockDeliveryMode();
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.paymentDetails$ = this.checkoutPaymentService.getPaymentDetails();
  }

  toggleTAndC(): void {
    this.tAndCToggler = !this.tAndCToggler;
  }
  edit() {
    this.goToQuoteReview.emit();
  }
  placeOrder(): void {
    this.checkoutService.placeOrder();
    this.checkoutService.orderPlaced = true;
    this.routingService.go({ cxRoute: 'orderConfirmation' });
  }
}
