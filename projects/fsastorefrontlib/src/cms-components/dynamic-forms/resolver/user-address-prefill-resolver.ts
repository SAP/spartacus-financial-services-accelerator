import { UserAddressService } from '@spartacus/core';
import { filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { combineLatest } from 'rxjs';
import { PrefillResolver } from '@spartacus/dynamicforms';
import { FSUserRole } from '@spartacus/fsa-storefront';

@Injectable({
  providedIn: 'root',
})
export class FSUserAddressPrefillResolver implements PrefillResolver {
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
      filter(([_, user]) => !!user?.roles),
      map(([address, user]) => {
        if (!user?.roles.includes(FSUserRole.SELLER)) {
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
