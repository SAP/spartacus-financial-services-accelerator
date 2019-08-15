import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductActions } from '@spartacus/core';
import * as fromActions from '../../../../checkout/assets/store/actions/index';
import { OccProductService } from 'projects/fsastorefrontlib/src/lib/occ/pricing/occ-product.service';

@Injectable()
export class FSProductEffect {
    @Effect()
    getExtendedProductData$: Observable<any> = this.actions$.pipe(
        ofType(fromActions.LOAD_EXTENDED_PRODUCT_DATA),
        map((action: fromActions.LoadExtendedProductData) => action.payload),
        mergeMap(payload => {
            return this.occProductService
                .getExtendedProductData(payload.productCode, payload.pricingData)
                .pipe(
                    map((product: any) => {
                        return new ProductActions.LoadProductSuccess(product);
                    }),
                    catchError(error =>
                        of(
                            new ProductActions.LoadProductFail(
                                payload.productCode,
                                error
                            )
                        )
                    )
                );
        })
    );

    constructor(
        private actions$: Actions,
        private occProductService: OccProductService,
    ) { }
}

