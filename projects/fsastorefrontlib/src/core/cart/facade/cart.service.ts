import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ActiveCartService,
  AuthService,
  Cart,
  MultiCartService,
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  StateUtils,
  StateWithMultiCart,
} from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { PricingData } from './../../../occ/occ-models/form-pricing.interface';
import * as fromAction from './../../checkout/store/actions/index';

@Injectable()
export class FSCartService extends ActiveCartService {
  constructor(
    protected store: Store<StateWithMultiCart>,
    protected authService: AuthService,
    protected multiCartService: MultiCartService
  ) {
    super(store, authService, multiCartService);
  }

  createCartForProduct(
    productCode: string,
    bundleTemplateId: string,
    quantity: number,
    pricingData: PricingData
  ) {
    combineLatest([this.getActiveCartId(), this.authService.getOccUserId()])
      .pipe(
        take(1),
        map(([activeCartId, userId]) => {
          /** if active cart doesn't exist, first it should be created and once the cart
              is loaded and in success state, bundle should be started  */
          if (!activeCartId) {
            this.multiCartService
              .createCart({
                userId: userId,
                extraData: {
                  active: true,
                },
              })
              .pipe(
                filter(cartState => this.isCartCreated(cartState)),
                take(1),
                map(cartState => {
                  let newCartCode = cartState.value.code;
                  if (userId === OCC_USER_ID_ANONYMOUS) {
                    newCartCode = cartState.value.guid;
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
            /** if active cart exists, its enough just to start bundle for activeCartCode
                which will eventually clear bundle from the cart and maintain the same cart
                for the new product or remove session and create new one (in case that bundle
                is started once more for product from different category) */
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
    combineLatest([this.getActiveCartId(), this.authService.getOccUserId()])
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
    if (userId !== OCC_USER_ID_ANONYMOUS) {
      this.multiCartService.loadCart({
        userId: userId,
        cartId: cartId ? cartId : OCC_CART_ID_CURRENT,
        extraData: {
          active: true,
        },
      });
    }
  }

  private isCartCreated(cartState: StateUtils.ProcessesLoaderState<Cart>) {
    return cartState && cartState.success && !cartState.loading;
  }
}
