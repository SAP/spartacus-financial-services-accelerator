import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Product, ProductSelectors, StateWithProduct } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import * as fromActions from '../../../../checkout/assets/store/actions/index';
import { PricingData } from '../../models/pricing.interface';


@Injectable()
export class FSProductService {

    constructor(protected store: Store<StateWithProduct>) { }

    protected products: { [code: string]: Observable<Product> } = {};

    getCalculatedProductData(productCode: string, pricingData: PricingData): Observable<Product> {
        if (!this.products[productCode]) {
            this.products[productCode] = this.store.pipe(
                select(ProductSelectors.getSelectedProductStateFactory(productCode)),
                tap(productState => {
                    const attemptedLoad =
                        productState.loading || productState.success || productState.error;

                    if (!attemptedLoad) {
                        this.store.dispatch(new fromActions.LoadCalculatedProductData({
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
