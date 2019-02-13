import { Component, OnInit } from '@angular/core';
import { Cart, CartService, OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'fsa-quotes-review-page',
  templateUrl: './quotes-review-page.component.html',
  styleUrls: ['./quotes-review-page.component.scss']
})
export class QuotesReviewPageComponent implements OnInit {

  cart$: Observable<Cart>;

  constructor(
    protected cartService: CartService
  ) { }

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
  }

}
