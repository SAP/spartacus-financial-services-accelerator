import { Injectable } from '@angular/core';
import { FormDataStorageService } from '@fsa/dynamicforms';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CartActions, OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { Action } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { CartConnector } from '../../../cart/connectors/cart.connector';
import { FSCart } from '../../../../occ/occ-models';
import * as fromQuoteActions from '../../../my-account/store/actions/quote.action';
import * as fromActions from '../actions/cart.action';
import { getCartIdByUserId } from '../utils/utils';

@Injectable()
export class CartEffects {
  @Effect()
  createCart$: Observable<
    | CartActions.MergeCartSuccess
    | CartActions.CreateCartSuccess
    | CartActions.CreateCartFail
    | CartActions.SetTempCart
  > = this.actions$.pipe(
    ofType(CartActions.CREATE_CART),
    map((action: CartActions.CreateCart) => action.payload),
    mergeMap(payload => {
      return this.cartConnector
        .create(payload.userId, payload.oldCartId, payload.toMergeCartGuid)
        .pipe(
          switchMap((cart: FSCart) => {
            const conditionalActions = [];
            if (payload.oldCartId) {
              console.log(cart);
              conditionalActions.push(
                new CartActions.MergeCartSuccess({
                  extraData: payload.extraData,
                  userId: payload.userId,
                  tempCartId: payload.tempCartId,
                  cartId: getCartIdByUserId(cart, payload.userId),
                  oldCartId: payload.oldCartId,
                })
              );
            }
            console.log(payload);
            return [
              new CartActions.CreateCartSuccess({
                ...payload,
                cart,
                cartId: getCartIdByUserId(cart, payload.userId),
              }),
              new CartActions.SetTempCart({
                cart,
                tempCartId: payload.tempCartId,
              }),
              ...conditionalActions,
            ];
          }),
          catchError(error => from([new CartActions.CartAddEntryFail(error)]))
        );
    })
  );

  @Effect()
  addOptionalProduct$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.ADD_OPTIONAL_PRODUCT),
    map((action: fromActions.AddOptionalProduct) => action.payload),
    concatMap(payload => {
      return this.cartConnector
        .addToCart(
          payload.userId,
          payload.cartId,
          payload.productCode,
          payload.quantity,
          payload.entryNumber
        )
        .pipe(
          concatMap((cart: any) => [
            new CartActions.CartAddEntrySuccess({
              ...cart.entry,
              userId: payload.userId,
              cartId: payload.cartId,
            }),
          ]),
          catchError(error =>
            from([
              new CartActions.CartAddEntryFail(error),
              new CartActions.LoadCart({
                cartId: payload.cartId,
                userId: payload.userId,
              }),
            ])
          )
        );
    })
  );

  @Effect()
  startBundle$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.START_BUNDLE),
    map((action: fromActions.StartBundle) => action.payload),
    concatMap(payload => {
      return this.cartConnector
        .startBundle(
          payload.userId,
          payload.cartId,
          payload.productCode,
          payload.bundleTemplateId,
          payload.quantity,
          payload.pricingData
        )
        .pipe(
          concatMap((cart: any) => {
            const actions: Action[] = [];
            const cartCode =
              payload.userId === OCC_USER_ID_ANONYMOUS
                ? cart.guid
                : cart.cartCode;
            if (cart?.entry?.product?.defaultCategory) {
              const formDataId = this.formDataStorageService.getFormDataIdByCategory(
                cart.entry.product.defaultCategory.code
              );
              if (formDataId) {
                const insuranceQuote = {
                  quoteDetails: {
                    entry: [
                      {
                        key: 'formId',
                        value: formDataId,
                      },
                    ],
                  },
                };
                actions.push(
                  new fromQuoteActions.UpdateQuote({
                    userId: payload.userId,
                    cartId: cartCode,
                    quoteContent: insuranceQuote,
                  })
                );
              }
            }
            if (cartCode === payload.cartId) {
              actions.push(
                new CartActions.CartAddEntrySuccess({
                  ...cart.entry,
                  userId: payload.userId,
                  cartId: cartCode,
                })
              );
            }
            return [
              new CartActions.LoadCart({
                userId: payload.userId,
                cartId: cartCode,
                extraData: {
                  active: true,
                },
              }),
              ...actions,
            ];
          }),
          catchError(error => from([new CartActions.CartAddEntryFail(error)]))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private cartConnector: CartConnector,
    private formDataStorageService: FormDataStorageService
  ) {}
}
