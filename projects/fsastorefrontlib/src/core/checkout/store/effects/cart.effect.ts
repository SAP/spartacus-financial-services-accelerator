import { Injectable } from '@angular/core';
import { FormDataStorageService } from '@spartacus/dynamicforms';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { CartActions } from '@spartacus/cart/base/core';
import { from, Observable } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { CartConnector } from '../../../cart/connectors/cart.connector';
import * as fromQuoteActions from '../../../my-account/store/actions/quote.action';
import * as fromActions from '../actions/cart.action';
@Injectable()
export class CartEffects {
  addOptionalProduct$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
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
    )
  );

  startBundle$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
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
              } else {
                actions.push(new fromActions.StartBundleFail(payload.cartId));
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
    )
  );

  constructor(
    private actions$: Actions,
    private cartConnector: CartConnector,
    private formDataStorageService: FormDataStorageService
  ) {}
}
