import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CartActions } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OccFSCartAdapter } from '../../../../occ/services/cart/occ-fs-cart.adapter';
import * as fromActions from '../actions/fs-cart.action';
import * as fromQuoteActions from '../../../my-account/store/actions/quote.action';
import { categoryFormRelationMappings } from './../../../../cms-components/form/cms-category-form-component/form-sample-mapping-configurations';
import { FormDataService } from '@fsa/dynamicforms';

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
            if (
              cart &&
              cart.entry &&
              cart.entry.product &&
              cart.entry.product.defaultCategory
            ) {
              const currentCategoryCode =
                cart.entry.product.defaultCategory.code;
              const formDefinitionId = categoryFormRelationMappings.find(
                mapping => mapping.categoryCode === currentCategoryCode
              ).formDefinitionId;

              const quoteDetails = {
                quoteDetails: {
                  entry: [
                    {
                      key: 'formId',
                      value: this.formDataService.getFormDataIdFromLocalStorage(
                        formDefinitionId
                      ),
                    },
                  ],
                },
              };
              return [
                new fromQuoteActions.UpdateQuote({
                  userId: payload.userId,
                  cartId: payload.cartId,
                  quoteContent: quoteDetails,
                }),
                new CartActions.CartAddEntrySuccess(cart.entry),
              ];
            }
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
