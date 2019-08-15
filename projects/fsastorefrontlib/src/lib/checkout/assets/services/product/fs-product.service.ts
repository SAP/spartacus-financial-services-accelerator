import { select, Store } from '@ngrx/store';
import { tap, map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product, StateWithProduct, ProductSelectors } from '@spartacus/core';

import { PricingData } from '../../models/pricing.interface';
import * as fromActions from '../../../../checkout/assets/store/actions/index';

@Injectable()
export class FSProductService {

    constructor(protected store: Store<StateWithProduct>) { }

    protected products: { [code: string]: Observable<Product> } = {};

    getExtendedProductData(productCode: string, pricingData: PricingData): Observable<Product> {
        if (!this.products[productCode]) {
            this.products[productCode] = this.store.pipe(
                select(ProductSelectors.getSelectedProductStateFactory(productCode)),
                tap(productState => {
                    const attemptedLoad =
                        productState.loading || productState.success || productState.error;

                    if (!attemptedLoad) {
                        this.store.dispatch(new fromActions.LoadExtendedProductData({
                            productCode: productCode,
                            pricingData: pricingData,
                        }));
                    }
                }),
                map(productState => productState.value),
                shareReplay({ bufferSize: 1, refCount: true })
            );
        }
        return this.products[productCode];
    }
}
