import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PaymentDetails, CheckoutService } from '@spartacus/core';

@Component({
  selector: 'fsa-final-review',
  templateUrl: './final-review.component.html',
  styleUrls: ['./final-review.component.scss']
})
export class FinalReviewComponent {

  @Input()
  paymentDetails: PaymentDetails;
  @Output()
  goToQuoteReview = new EventEmitter<any>();
  tAndCToggler = false;
  constructor(
    private checkoutService: CheckoutService
    ) { }

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
