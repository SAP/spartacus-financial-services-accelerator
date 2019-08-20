import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CheckoutPaymentService,
  CheckoutService,
  PaymentDetails,
  RoutingService
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSCheckoutConfigService } from '../../services/fs-checkout-config.service';

@Component({
  selector: 'fsa-final-review',
  templateUrl: './final-review.component.html'
})
export class FinalReviewComponent implements OnInit {
  @Input()
  paymentDetails$: Observable<PaymentDetails>;
  @Output()
  goToQuoteReview = new EventEmitter<any>();
  tAndCToggler = false;
  constructor(
    private checkoutService: CheckoutService,
    private checkoutPaymentService: CheckoutPaymentService,
    private routingService: RoutingService,
    private checkoutConfigService: FSCheckoutConfigService,
    private activatedRoute: ActivatedRoute
  ) {}

  checkoutStepUrlNext: string;

  ngOnInit() {
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
    this.routingService.go({ cxRoute: 'orderConfirmation' });
  }
}
