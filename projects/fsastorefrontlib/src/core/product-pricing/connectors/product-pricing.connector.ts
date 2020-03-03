import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductPricingAdapter } from './product-pricing.adapter';
import { PricingData } from '../../../occ/occ-models/form-pricing.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductPricingConnector {
  constructor(protected adapter: ProductPricingAdapter) {}

  getCalculatedProductData(
    productCode: string,
    pricingData: PricingData
  ): Observable<Product> {
    return this.adapter.getCalculatedProductData(productCode, pricingData);
  }
}
