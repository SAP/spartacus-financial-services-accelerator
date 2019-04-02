import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartService, OccConfig, PaymentDetails, CheckoutService } from '@spartacus/core';

@Component({
  selector: 'fsa-final-review',
  templateUrl: './final-review.component.html',
  styleUrls: ['./final-review.component.scss']
})
export class FinalReviewComponent implements OnInit {

  cart$: Observable<Cart>;
  cartLoaded$: Observable<boolean>;
  @Input()
  paymentDetails: PaymentDetails;
  @Output()
  backStep = new EventEmitter<any>();

  constructor(
    protected cartService: CartService,
    private config: OccConfig,
    private checkoutService: CheckoutService
    ) { }

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
    this.cartLoaded$ = this.cartService.getLoaded();
    this.checkoutService.getPaymentDetails().subscribe(paymentInfo => {
      console.log(paymentInfo);
     });
  }
  public getBaseUrl() {
    return this.config.server.baseUrl || '';
  }

  back() {
    this.backStep.emit();
  }
}
