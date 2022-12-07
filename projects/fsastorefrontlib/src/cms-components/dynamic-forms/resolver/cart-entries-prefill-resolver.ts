import { Injectable } from '@angular/core';
import { PrefillResolver } from '@spartacus/dynamicforms';
import { map } from 'rxjs/operators';
import { FSCartService } from '../../../core/cart/facade/cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartEntriesPrefillResolver implements PrefillResolver {
  constructor(protected cartService: FSCartService) {}

  getPrefillValue() {
    return this.cartService.getActive().pipe(
      map(cart => {
      const productCodes = [];
        cart.deliveryOrderGroups.forEach(deliveryOrderGroup => {
          deliveryOrderGroup.entries.forEach(entry => {
            if (entry.product) {
              productCodes.push(entry.product.code);
            }
          });
        });
        return productCodes.toString();
      })
    );
  }
}
