import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { CartService } from '../../../cart/facade/cart.service';

@Component({
  selector: 'cx-cart-page-layout',
  templateUrl: './cart-page-layout.component.html',
  styleUrls: ['./cart-page-layout.component.scss']
})
export class CartPageLayoutComponent implements OnInit {
  cart$: Observable<any>;

  constructor(protected cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartMergeComplete$.subscribe(isCartMergeComplete => {
      if (isCartMergeComplete) {
        this.cartService.loadCartDetails();
      }
    });
    this.cart$ = this.cartService.activeCart$;
  }
}
