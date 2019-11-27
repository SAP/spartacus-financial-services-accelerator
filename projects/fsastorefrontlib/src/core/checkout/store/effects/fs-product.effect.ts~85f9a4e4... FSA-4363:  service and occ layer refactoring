import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductActions } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as fromActions from '../actions/index';
import { OccProductPricingAdapter } from '../../../../occ/services/pricing/occ-product-pricing.adapter';

@Injectable()
export class FSProductEffect {
  @Effect()
  getCalculatedProductData$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_CALCULATED_PRODUCT_DATA),
    map((action: fromActions.LoadCalculatedProductData) => action.payload),
    mergeMap(payload => {
      return this.occProductPricingAdapter
        .getCalculatedProductData(payload.productCode, payload.pricingData)
        .pipe(
          map((product: any) => {
            return new ProductActions.LoadProductSuccess(product);
          }),
          catchError(error =>
            of(new ProductActions.LoadProductFail(payload.productCode, error))
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private occProductPricingAdapter: OccProductPricingAdapter
  ) {}
}
