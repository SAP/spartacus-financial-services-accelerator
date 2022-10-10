import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ActiveCartService,
  Cart,
  Command,
  CommandService,
  EventService,
  MultiCartService,
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  StateUtils,
  StateWithMultiCart,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { QuoteApplicationUpdatedEvent } from '../../../core/events/quotes-applications/quotesApplications.events';
import { PricingData } from './../../../occ/occ-models/form-pricing.interface';
import { CartConnector } from '../../cart/connectors/cart.connector';
import * as fromAction from './../../checkout/store/actions/index';

@Injectable()
export class FSCartService extends ActiveCartService {
  constructor(
    protected store: Store<StateWithMultiCart>,
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService,
    protected eventService: EventService,
    protected command: CommandService,
    protected cartConnector: CartConnector
  ) {
    super(store, multiCartService, userIdService);
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

  protected startBundleForCartCommand: Command<{
    userId: string;
    cartId: string;
    productCode: string;
    bundleTemplateId: string;
    quantity: number;
    pricingData: PricingData;
  }> = this.command.create(payload =>
    this.userIdService.getUserId().pipe(
      take(1),
      switchMap(occUserId =>
        this.cartConnector
          .startBundle(
            payload.userId,
            payload.cartId,
            payload.productCode,
            payload.bundleTemplateId,
            payload.quantity,
            payload.pricingData
          )
          .pipe(
            tap(_ => {
              this.eventService.dispatch(
                {
                  userId: payload.userId,
                  activeCartId: payload.cartId,
                  productCode: payload.productCode,
                  bundleTemplateId: payload.bundleTemplateId,
                  quantity: payload.quantity,
                  pricingData: payload.pricingData,
                },
                QuoteApplicationUpdatedEvent
              );
              return this.loadCart(payload.cartId, occUserId);
            })
          )
      )
    )
  );

  protected startBundleForCart(
    userId: string,
    cartCode: string,
    productCode: string,
    bundleTemplateId: string,
    quantity: number,
    pricingData: PricingData
  ) {
    localStorage.removeItem('bindingState');
    this.eventService.dispatch({}, QuoteApplicationUpdatedEvent);
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

  private isCartCreated(cartState: StateUtils.ProcessesLoaderState<Cart>) {
    return cartState && cartState.success && !cartState.loading;
  }
}
