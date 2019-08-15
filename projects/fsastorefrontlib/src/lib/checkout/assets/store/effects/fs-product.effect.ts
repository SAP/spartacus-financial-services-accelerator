import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CartDataService, ProductActions } from '@spartacus/core';
import * as fromActions from '../../../../checkout/assets/store/actions/index';
import { OccPricingService } from 'projects/fsastorefrontlib/src/lib/occ/pricing/occ-pricing.service';

@Injectable()
export class FSProductEffect {
    @Effect()
    getExtendedProductData$: Observable<any> = this.actions$.pipe(
        ofType(fromActions.LOAD_EXTENDED_PRODUCT),
        map((action: fromActions.LoadExtendedProduct) => action.payload),
        mergeMap(payload => {
            return this.occPricingService
                .getExtendedProductData(payload.productCode, payload.priceData)
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
        private occPricingService: OccPricingService,
        private cartData: CartDataService
    ) { }
}

