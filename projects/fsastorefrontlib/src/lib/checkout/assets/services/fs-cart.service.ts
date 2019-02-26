import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthService, CartDataService, CartService, StateWithCart } from '@spartacus/core';
import * as fromAction from '@spartacus/core';
import * as fromSelector from '@spartacus/core';
import * as fromFSAction from '../../../checkout/assets/store/actions/index';

@Injectable()
export class FSCartService extends CartService {

  protected callbackFunction: Function;

  constructor(
    private fsStore: Store<StateWithCart>,
    private fsCartData: CartDataService,
    private fsAuthService: AuthService
  ) {
    super(fsStore, fsCartData, fsAuthService);
    this.initCart();
  }

  protected initCart(): void {
    this.fsStore.pipe(select(fromSelector.getCartContent)).subscribe(cart => {
      this.fsCartData.cart = cart;
      if (this.callbackFunction) {
        this.callbackFunction();
        this.callbackFunction = null;
      }
    });
  }

  addOptionalProduct(productCode: string, quantity: number): void {
    this.fsStore.dispatch(
      new fromFSAction.AddOptionalProduct({
        userId: this.fsCartData.userId,
        cartId: this.fsCartData.cartId,
        productCode: productCode,
        quantity: quantity
      })
    );
  }

  createCartAndStartBundle(productCode: string, bundleTemplateId: string, quantity: number): void {
    this.fsStore.dispatch(
      new fromAction.CreateCart({ userId: this.fsCartData.userId })
    );
    this.callbackFunction = function () {
      this.fsStore.dispatch(
        new fromFSAction.StartBundle({
          userId: this.fsCartData.userId,
          cartId: this.fsCartData.cartId,
          productCode: productCode,
          bundleTemplateId: bundleTemplateId,
          quantity: quantity
        })
      );
    }
  }
}
