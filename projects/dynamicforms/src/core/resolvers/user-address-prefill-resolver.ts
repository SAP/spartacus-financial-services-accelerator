import { UserAddressService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefillResolver } from './prefill-resolver.interface';

@Injectable({
  providedIn: 'root',
})
export class UserAddressPrefillResolver implements PrefillResolver {
  constructor(protected userAddressService: UserAddressService) {}

  getPrefillValue(fieldPath: string) {
    const attributes = fieldPath.split('.');
    let currentValue;
    return this.userAddressService.getAddresses().pipe(
      map(address => {
        currentValue = address[0];
        if (!currentValue) {
          return ' ';
        }
        attributes.forEach(attribute => {
          currentValue = currentValue[attribute];
        });
        return currentValue;
      })
    );
  }
}
