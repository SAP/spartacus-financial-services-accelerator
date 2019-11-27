import { PricingData } from './../../occ-models/form-pricing.interface';
import { CartModification } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class FSCartAdapter {
  /**
   * Abstract method used to add entry to cart
   *
   * @param userId the user id
   * @param cartId code of cart
   * @param productCode code of product to add
   * @param quantity the quantity of the product
   */
  abstract addToCart(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number,
    entryNumber: string
  ): Observable<CartModification>;

  /**
   * Abstract method used to start bundle for cart
   *
   *
   * @param userId the user id
   * @param cartId code of cart
   * @param bundleTemplateId the bundle template id
   * @param productCode code of product to add
   * @param quantity the quantity of the product
   */
  abstract startBundle(
    userId: string,
    cartId: string,
    productCode: string,
    bundleTemplateId: string,
    quantity: number,
    pricingData: PricingData
  ): Observable<CartModification>;
}
