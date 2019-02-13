import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService, CartDataService, CartService, StateWithCart } from '@spartacus/core';
import * as fromAction from '../../../checkout/assets/store/actions/index';

@Injectable()
export class FSCartService extends CartService {
  constructor(
    private fsStore: Store<StateWithCart>,
    private fsCartData: CartDataService,
    private fsAuthService: AuthService
  ) {
    super(fsStore, fsCartData, fsAuthService);
  }

  addOptionalProduct(productCode: string, quantity: number): void {
    this.fsStore.dispatch(
      new fromAction.AddOptionalProduct({
        userId: this.fsCartData.userId,
        cartId: this.fsCartData.cartId,
        productCode: productCode,
        quantity: quantity
      })
    );
  }
}
