import { CartModification } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FSCartAdapter } from './fs-cart.adapter';
import { PricingData } from '../../../occ/occ-models';

@Injectable({
  providedIn: 'root',
})
export class FsCartConnector {
  constructor(protected adapter: FSCartAdapter) {}

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
