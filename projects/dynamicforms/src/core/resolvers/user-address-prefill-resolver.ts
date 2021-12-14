import { UserAddressService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefillResolver } from './prefill-resolver.interface';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { combineLatest } from 'rxjs';
import { FSUserRole } from '@spartacus/fsa-storefront';

@Injectable({
  providedIn: 'root',
})
export class UserAddressPrefillResolver implements PrefillResolver {
  constructor(
    protected userAddressService: UserAddressService,
    protected userAccountFacade: UserAccountFacade
  ) {}

  getPrefillValue(fieldPath: string) {
    const attributes = fieldPath.split('.');
    let currentValue;
    return combineLatest([
      this.userAddressService.getAddresses(),
      this.userAccountFacade.get(),
    ]).pipe(
      map(([address, user]) => {
        if (!!user.roles.includes[FSUserRole.SELLER]) {
          currentValue = address[0];
          if (!currentValue) {
            return ' ';
          }
          attributes.forEach(attribute => {
            currentValue = currentValue[attribute];
          });
          return currentValue;
        }
      })
    );
  }
}
