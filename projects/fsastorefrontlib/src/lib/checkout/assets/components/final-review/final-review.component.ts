import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { PaymentDetails, CheckoutService, CheckoutPaymentService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ɵd as CheckoutConfigService } from '@spartacus/storefront';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'fsa-final-review',
  templateUrl: './final-review.component.html',
  styleUrls: ['./final-review.component.scss']
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
    private checkoutConfigService: CheckoutConfigService,
    private activatedRoute: ActivatedRoute
    ) { }

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
    this.routingService.go(this.checkoutStepUrlNext);
  }
}
