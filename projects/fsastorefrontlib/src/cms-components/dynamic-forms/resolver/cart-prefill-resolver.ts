import { map, combineAll } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefillResolver } from '@fsa/dynamicforms';
import { FSCartService } from './../../../core/cart/facade/cart.service';
import { FormsUtils } from '../utils/forms-utils';

@Injectable({
  providedIn: 'root',
})
export class CartPrefillResolver implements PrefillResolver {
  constructor(protected cartService: FSCartService) {}

  getFieldValue(fieldPath: string) {
    return this.cartService.getActive().pipe(
      map(cart => {
        const serializedCart = FormsUtils.serializeQuoteDetails(cart);
        let value = FormsUtils.getValueByPath(fieldPath, serializedCart);
        value = FormsUtils.convertIfDate(value);
        return value;
      })
    );
  }
}
