import { FSCartService } from '../../../../core/checkout/services';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cart } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'fsa-mini-cart',
  templateUrl: './mini-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSMiniCartComponent {
  cart$: Observable<Cart>;

  constructor(protected cartService: FSCartService) {
    this.cart$ = this.cartService.getActive();
  }
}
