import { PricingData } from './../../occ-models/form-pricing.interface';
import { CartModification } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class FSCartAdapter {
  /**
   * Abstract method used to add entry to cart
   *
   * @param userId The user id
   * @param cartId The cart id
   * @param productCode The code of product to add
   * @param quantity The quantity of the product
   */
  abstract addToCart(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number,
    entryNumber: string
  ): Observable<CartModification>;

  /**
   * Abstract method used to start new bundle in cart
   *
   *
   * @param userId The user id
   * @param cartId The cart id
   * @param bundleTemplateId The bundle template id
   * @param productCode The code of product to add
   * @param quantity The quantity of the product
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
