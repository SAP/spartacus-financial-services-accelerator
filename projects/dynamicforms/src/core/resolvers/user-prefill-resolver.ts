import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefillResolver } from './prefill-resolver.interface';
import { FormsUtils } from './utils/forms-utils';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { FSUserRole } from '@spartacus/fsa-storefront';

@Injectable({
  providedIn: 'root',
})
export class UserPrefillResolver implements PrefillResolver {
  constructor(protected userAccountFacade: UserAccountFacade) {}

  getPrefillValue(fieldPath: string) {
    const attributes = fieldPath.split('.');
    let currentValue;
    return this.userAccountFacade.get().pipe(
      map(user => {
        if (!!user.roles.includes[FSUserRole.SELLER]) {
          currentValue = FormsUtils.getValueByPath(fieldPath, user);
          return currentValue;
        }
      })
    );
  }
}
