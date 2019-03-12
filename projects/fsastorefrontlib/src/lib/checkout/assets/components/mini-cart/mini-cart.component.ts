import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cart, CartService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'fs-mini-cart',
  templateUrl: './mini-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FSMiniCartComponent {

  cart$: Observable<Cart>;

  constructor(
    protected cartService: CartService
  ) {
    this.cart$ = this.cartService.getActive();
  }
}
