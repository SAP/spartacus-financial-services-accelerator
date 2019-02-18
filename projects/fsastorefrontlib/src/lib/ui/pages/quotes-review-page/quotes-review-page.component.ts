import { Component, OnInit } from '@angular/core';
import { Cart, CartService, OccConfig } from '@spartacus/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'fsa-quotes-review-page',
  templateUrl: './quotes-review-page.component.html',
  styleUrls: ['./quotes-review-page.component.scss']
})
export class QuotesReviewPageComponent implements OnInit {

  cart$: Observable<Cart>;

  constructor(
    protected cartService: CartService,
    private config: OccConfig
  ) { }

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
  }
  public getBaseUrl() {
    return this.config.server.baseUrl || '';
  }
}
