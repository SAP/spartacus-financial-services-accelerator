import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartService, OccConfig } from '@spartacus/core';


@Component({
  selector: 'fsa-quote-review',
  templateUrl: './quote-review.component.html',
  styleUrls: ['./quote-review.component.scss']
})
export class QuoteReviewComponent implements OnInit {

  cart$: Observable<Cart>;
  cartLoaded$: Observable<boolean>;

  @Output()
  backStep = new EventEmitter<any>();

  @Output()
  nextStep = new EventEmitter<any>();

  constructor(
    protected cartService: CartService,
    private config: OccConfig
    ) { }

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
    this.cartLoaded$ = this.cartService.getLoaded();
  }
  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  back() {
    this.backStep.emit();
  }
  next() {
    this.nextStep.emit();
  }

}
