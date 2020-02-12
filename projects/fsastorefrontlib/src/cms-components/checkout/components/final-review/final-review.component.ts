import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CheckoutPaymentService,
  PaymentDetails,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSCheckoutConfigService } from '../../../../core/checkout/services/fs-checkout-config.service';
import { FSCheckoutService } from '../../../../core/checkout/services/fs-checkout.service';

@Component({
  selector: 'fsa-final-review',
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
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.paymentDetails$ = this.checkoutPaymentService.getPaymentDetails();
    this.checkoutService.mockDeliveryMode();
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
