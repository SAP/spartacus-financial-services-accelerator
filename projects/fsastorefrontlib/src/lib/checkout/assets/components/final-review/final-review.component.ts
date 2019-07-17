import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { PaymentDetails, CheckoutService, CheckoutPaymentService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'fsa-final-review',
  templateUrl: './final-review.component.html',
  styleUrls: ['./final-review.component.scss']
})
export class FinalReviewComponent implements OnInit{

  @Input()
  paymentDetails$: Observable<PaymentDetails>;
  @Output()
  goToQuoteReview = new EventEmitter<any>();
  tAndCToggler = false;
  constructor(
    private checkoutService: CheckoutService,
    protected checkoutPaymentService: CheckoutPaymentService
    ) { }

  ngOnInit() {
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
  }
}
