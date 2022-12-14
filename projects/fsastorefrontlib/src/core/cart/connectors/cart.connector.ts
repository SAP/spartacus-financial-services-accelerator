import { Injectable } from '@angular/core';
import { CartModification } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { PricingData } from '../../../occ/occ-models';
import { CartAdapter } from './cart.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartConnector {
  constructor(protected adapter: CartAdapter) {}

  addToCart(
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number,
    entryNumber: string
  ): Observable<CartModification> {
    return this.adapter.addToCart(
      userId,
      cartId,
      productCode,
      quantity,
      entryNumber
    );
  }

  startBundle(
    userId: string,
    cartId: string,
    productCode: string,
    bundleTemplateId: string,
    quantity: number,
    pricingData: PricingData
  ): Observable<CartModification> {
    return this.adapter.startBundle(
      userId,
      cartId,
      productCode,
      bundleTemplateId,
      quantity,
      pricingData
    );
  }
}
