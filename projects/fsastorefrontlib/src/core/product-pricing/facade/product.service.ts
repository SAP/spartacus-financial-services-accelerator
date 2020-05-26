import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  Product,
  ProductSelectors,
  ProductService,
  StateWithProduct,
  ProductLoadingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromActions from '../../checkout/store/actions/index';
import { PricingData } from './../../../occ/occ-models/form-pricing.interface';

@Injectable()
export class FSProductService extends ProductService {
  constructor(protected store: Store<StateWithProduct>,
    protected productLoading: ProductLoadingService
    ) {
    super(store, productLoading);
  }

  getCalculatedProductData(
    productCode: string,
    pricingData: PricingData
  ): Observable<Product> {
    this.store.dispatch(
      new fromActions.LoadCalculatedProductData({
        productCode: productCode,
        pricingData: pricingData,
      })
    );

    return this.store.pipe(
      select(ProductSelectors.getSelectedProductStateFactory(productCode)),
      map(productState => productState.value)
    );
  }
}
