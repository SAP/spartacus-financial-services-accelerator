import { CartModification } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PricingData, FSCart } from '../../../occ/occ-models';

export abstract class CartAdapter {
  /**
   * Abstract method used to create cart. If toMergeCartGuid is specified, cart will be merged with existing one
   *
   * @param userId The user id
   * @param oldCartId The old cart id
   * @param toMergeCartGuid Cart ID to be merged
   */
  abstract create(
    userId: string,
    oldCartId?: string,
    toMergeCartGuid?: string
  ): Observable<FSCart>;

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
