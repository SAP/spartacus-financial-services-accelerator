import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Product, ProductSelectors, StateWithProduct } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromActions from '../../store/actions/index';
import { PricingData } from '../../../models/pricing.interface';

@Injectable()
export class FSProductService {
  constructor(protected store: Store<StateWithProduct>) {}

  protected products: { [code: string]: Observable<Product> } = {};

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
