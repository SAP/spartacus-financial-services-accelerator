import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cart } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSCartService } from './../../../../core/cart/facade/cart.service';

@Component({
  selector: 'cx-fs-mini-cart',
  templateUrl: './mini-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCartComponent {
  cart$: Observable<Cart>;

  constructor(protected cartService: FSCartService) {
    this.cart$ = this.cartService.getActive();
  }
}
