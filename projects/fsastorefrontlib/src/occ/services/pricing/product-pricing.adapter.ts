import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PricingData } from '../../../core/models/pricing.interface';

export abstract class ProductPricingAdapter {
  /**
   * Abstract method used to get calculated product data
   *
   * @param productCode The code of product
   * @param productCode The pricing data used in product price calculation
   */
  abstract getCalculatedProductData(
    productCode: string,
    pricingData: PricingData
  ): Observable<Product>;
}
