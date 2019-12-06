import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  AuthService,
  Cart,
  CartActions,
  CartDataService,
  CartSelectors,
  CartService,
  StateWithCart,
} from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { PricingData } from '../../../models/pricing.interface';
import * as fromFSAction from '../../store/actions/index';

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
  }

  addOptionalProduct(
    productCode: string,
    quantity: number,
    entryNumber: string
  ): void {
    this.fsStore.dispatch(
      new fromFSAction.AddOptionalProduct({
        userId: this.fsCartData.userId,
        cartId: this.fsCartData.cartId,
        productCode: productCode,
        quantity: quantity,
        entryNumber: entryNumber,
      })
    );
  }

  createCartAndStartBundle(
    productCode: string,
    bundleTemplateId: string,
    quantity: number,
    pricingData: PricingData
  ): void {
    this.fsStore
      .pipe(
        select(CartSelectors.getActiveCartState),
        tap(cartState => {
          if (
            !this.isCartCreated(cartState.value.content) &&
            !cartState.loading
          ) {
            this.fsStore.dispatch(
              new CartActions.CreateCart({ userId: this.cartData.userId })
            );
          }
        }),
        filter(cartState => this.isCartCreated(cartState.value.content)),
        take(1)
      )
      .subscribe(_ => {
        this.fsStore.dispatch(
          new fromFSAction.StartBundle({
            userId: this.fsCartData.userId,
            cartId: this.fsCartData.cartId,
            productCode: productCode,
            bundleTemplateId: bundleTemplateId,
            quantity: quantity,
            pricingData: pricingData,
          })
        );
      });
  }

  reLoadCart() {
    this.store.dispatch(
      new CartActions.LoadCart({
        cartId: this.fsCartData.cartId,
        userId: this.fsCartData.userId,
      })
    );
  }

  private isCartCreated(cart: Cart): boolean {
    return cart && typeof cart.guid !== 'undefined';
  }
}
