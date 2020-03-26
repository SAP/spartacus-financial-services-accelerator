import { Injectable } from '@angular/core';
import { FormDataService } from '@fsa/dynamicforms';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { CartActions, OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { from, Observable } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { FsCartConnector } from '../../../cart/connectors/fs-cart.connector';
import * as fromQuoteActions from '../../../my-account/store/actions/quote.action';
import * as fromActions from '../actions/fs-cart.action';

@Injectable()
export class FSCartEffects {
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
              new CartActions.CartProcessesDecrement(payload.cartId),
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
              payload.userId === 'anonymous' ? payload.cartId : cart.cartCode;

            if (
              cart.entry &&
              cart.entry.product &&
              cart.entry.product.defaultCategory
            ) {
              const formDataId = this.formDataService.getFormDataIdByCategory(
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
            if (
              cartCode !== payload.cartId &&
              OCC_USER_ID_ANONYMOUS !== payload.userId
            ) {
              actions.push(
                new CartActions.CartProcessesDecrement(payload.cartId)
              );
            } else {
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
          catchError(error =>
            from([new CartActions.CartAddEntryFail(JSON.stringify(error))])
          )
        );
    })
  );

  @Effect()
  processesIncrement$: Observable<
    CartActions.CartProcessesIncrement
  > = this.actions$.pipe(
    ofType(fromActions.ADD_OPTIONAL_PRODUCT, fromActions.START_BUNDLE),
    map(
      (action: fromActions.AddOptionalProduct | fromActions.StartBundle) =>
        action.payload
    ),
    map(payload => new CartActions.CartProcessesIncrement(payload.cartId))
  );

  constructor(
    private actions$: Actions,
    private cartConnector: FsCartConnector,
    private formDataService: FormDataService
  ) {}
}
