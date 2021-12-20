import { filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { FormsUtils, PrefillResolver } from '@spartacus/dynamicforms';
import { FSUserRole } from '../../../occ/occ-models/occ.models';

@Injectable({
  providedIn: 'root',
})
export class FSUserPrefillResolver implements PrefillResolver {
  constructor(protected userAccountFacade: UserAccountFacade) {}

  getPrefillValue(fieldPath: string) {
    const attributes = fieldPath.split('.');
    let currentValue;
    return this.userAccountFacade.get().pipe(
      filter(user => !!user?.roles),
      map(user => {
        if (!user.roles.includes(FSUserRole.SELLER)) {
          currentValue = FormsUtils.getValueByPath(fieldPath, user);
          return currentValue;
        }
      })
    );
  }
}
