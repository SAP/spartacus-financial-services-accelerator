import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthService, CartDataService, CartService, StateWithCart } from '@spartacus/core';
import * as fromAction from '@spartacus/core';
import * as fromSelector from '@spartacus/core';
import * as fromFSAction from '../../../checkout/assets/store/actions/index';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FSCartService extends CartService {

  protected callbackFunction: Function;
  protected productAddedSource = new BehaviorSubject<string>('');
  public mainProductAdded = this.productAddedSource.asObservable();

  constructor(
    protected fsStore: Store<StateWithCart>,
    protected fsCartData: CartDataService,
    protected fsAuthService: AuthService
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

  addOptionalProduct(productCode: string, quantity: number, entryNumber: string): void {
    this.fsStore.dispatch(
      new fromFSAction.AddOptionalProduct({
        userId: this.fsCartData.userId,
        cartId: this.fsCartData.cartId,
        productCode: productCode,
        quantity: quantity,
        entryNumber: entryNumber
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
    this.productAddedSource.next(productCode);
    };
  }
}
