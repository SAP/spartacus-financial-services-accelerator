import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ActiveCartService,
  CartActions,
  MultiCartService,
  StateWithMultiCart,
} from '@spartacus/cart/base/core';
import { Cart, MultiCartFacade } from '@spartacus/cart/base/root';
import {
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  StateUtils,
  UserIdService,
} from '@spartacus/core';

import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PricingData } from './../../../occ/occ-models/form-pricing.interface';
import * as fromAction from './../../checkout/store/actions/index';

@Injectable()
export class FSCartService extends ActiveCartService {
  constructor(
    protected store: Store<StateWithMultiCart>,
    protected userIdService: UserIdService,
    protected multiCartFacade: MultiCartFacade,
    protected multiCartService: MultiCartService
  ) {
    super(multiCartFacade, userIdService);
  }

  setActiveCart(cart: Observable<Cart>) {
    this.activeCart$ = cart;
  }

  createCartForProduct(
    productCode: string,
    bundleTemplateId: string,
    quantity: number,
    pricingData: PricingData
  ) {
    combineLatest([this.getActiveCartId(), this.userIdService.getUserId()])
      .pipe(
        take(1),
        map(([activeCartId, userId]) => {
          if (!activeCartId) {
            this.multiCartService
              .createCart({
                userId: userId,
                extraData: {
                  active: true,
                },
              })
              .pipe(
                take(1),
                map(cart => {
                  let newCartCode = cart.code;
                  if (userId === OCC_USER_ID_ANONYMOUS) {
                    newCartCode = cart.guid;
                  }
                  this.startBundleForCart(
                    userId,
                    newCartCode,
                    productCode,
                    bundleTemplateId,
                    quantity,
                    pricingData
                  );
                })
              )
              .subscribe();
          } else {
            this.startBundleForCart(
              userId,
              activeCartId,
              productCode,
              bundleTemplateId,
              quantity,
              pricingData
            );
          }
        })
      )
      .subscribe();
  }

  protected startBundleForCart(
    userId: string,
    cartCode: string,
    productCode: string,
    bundleTemplateId: string,
    quantity: number,
    pricingData: PricingData
  ) {
    localStorage.removeItem('bindingState');
    this.store.dispatch(
      new fromAction.StartBundle({
        userId: userId,
        cartId: cartCode,
        productCode: productCode,
        bundleTemplateId: bundleTemplateId,
        quantity: quantity,
        pricingData: pricingData,
      })
    );
  }

  addOptionalProduct(
    productCode: string,
    quantity: number,
    entryNumber: string
  ): void {
    combineLatest([this.getActiveCartId(), this.userIdService.getUserId()])
      .pipe(take(1))
      .subscribe(([activeCartId, userId]) => {
        this.store.dispatch(
          new fromAction.AddOptionalProduct({
            userId: userId,
            cartId: activeCartId,
            productCode: productCode,
            quantity: quantity,
            entryNumber: entryNumber,
          })
        );
      })
      .unsubscribe();
  }

  loadCart(cartId: string, userId: string): void {
    this.multiCartService.loadCart({
      userId: userId,
      cartId: cartId ? cartId : OCC_CART_ID_CURRENT,
      extraData: {
        active: true,
      },
    });
  }

  getCart(cartId: string): Observable<Cart> {
    return this.multiCartService.getCart(cartId);
  }

  removeCart(cartId: string): void {
    this.store.dispatch(new CartActions.RemoveCart({ cartId }));
  }

  private isCartCreated(cartState: StateUtils.ProcessesLoaderState<Cart>) {
    return cartState && cartState.success && !cartState.loading;
  }
}
