import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartService, OccConfig } from '@spartacus/core';


@Component({
  selector: 'fsa-quote-review',
  templateUrl: './quote-review.component.html',
  styleUrls: ['./quote-review.component.scss']
})
export class QuoteReviewComponent implements OnInit {

  cart$: Observable<Cart>;

  constructor(
    protected cartService: CartService,
    private config: OccConfig,
    ) { }

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
  }
  public getBaseUrl() {
    return this.config.server.baseUrl || '';
  }
}
