import { Injectable } from '@angular/core';
import { FormDataService } from '@fsa/dynamicforms';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { CartActions } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OccFSCartAdapter } from '../../../../occ/services/cart/occ-fs-cart.adapter';
import * as fromQuoteActions from '../../../my-account/store/actions/quote.action';
import * as fromActions from '../actions/fs-cart.action';
import { categoryFormRelations } from './../../../../cms-components/form/cms-category-form-component/form-sample-mapping-configurations';

@Injectable()
export class FSCartEffects {
  @Effect()
  addOptionalProduct$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.ADD_OPTIONAL_PRODUCT),
    map((action: fromActions.AddOptionalProduct) => action.payload),
    switchMap(payload => {
      return this.occCartAdapter
        .addToCart(
          payload.userId,
          payload.cartId,
          payload.productCode,
          payload.quantity,
          payload.entryNumber
        )
        .pipe(
          map((entry: any) => {
            return new CartActions.CartAddEntrySuccess(entry);
          }),
          catchError(error => of(new CartActions.CartAddEntryFail(error)))
        );
    })
  );

  @Effect()
  startBundle$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.START_BUNDLE),
    map((action: fromActions.StartBundle) => action.payload),
    switchMap(payload => {
      return this.occCartAdapter
        .startBundle(
          payload.userId,
          payload.cartId,
          payload.productCode,
          payload.bundleTemplateId,
          payload.quantity,
          payload.pricingData
        )
        .pipe(
          switchMap((cart: any) => {
            const actions: Action[] = [];
            const cartCode =
              payload.userId === 'anonymous' ? payload.cartId : cart.cartCode;

            if (
              cart.entry &&
              cart.entry.product &&
              cart.entry.product.defaultCategory
            ) {
              const categoryFormRelation = categoryFormRelations.find(
                mapping =>
                  mapping.categoryCode ===
                  cart.entry.product.defaultCategory.code
              );

              let quoteDetails;
              if (
                categoryFormRelation &&
                categoryFormRelation.chooseCoverFormId
              ) {
                quoteDetails = {
                  quoteDetails: {
                    entry: [
                      {
                        key: 'formId',
                        value: this.formDataService.getFormDataIdFromLocalStorage(
                          categoryFormRelation.chooseCoverFormId
                        ),
                      },
                    ],
                  },
                };
              }

              if (quoteDetails) {
                actions.push(
                  new fromQuoteActions.UpdateQuote({
                    userId: payload.userId,
                    cartId: cartCode,
                    quoteContent: quoteDetails,
                  })
                );
              }
            }

            if (cart.cartCode !== payload.cartId) {
              actions.push(
                new CartActions.LoadCart({
                  userId: payload.userId,
                  cartId: cartCode,
                })
              );
            } else {
              actions.push(new CartActions.CartAddEntrySuccess(cart.entry));
            }

            return actions;
          }),
          catchError(error => of(new CartActions.CartAddEntryFail(error)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private occCartAdapter: OccFSCartAdapter,
    private formDataService: FormDataService
  ) {}
}
