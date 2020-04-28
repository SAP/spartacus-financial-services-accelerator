import { ActiveCartService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefilResolver } from './prefil-resolver.interface';

@Injectable({
  providedIn: 'root',
})
export class CartPrefilResolver implements PrefilResolver {
  constructor(protected cartService: ActiveCartService) {}

  // maybe this can also accept control and set value directly in here...
  getFieldValue(fieldPath: string) {
    const attributes = fieldPath.split('.');
    let currentValue;
    return this.cartService.getActive().pipe(
      map(cart => {
        currentValue = cart;
        attributes.forEach(attribute => {
          currentValue = currentValue[attribute];
        });
        return currentValue;
      })
    );
  }
}
