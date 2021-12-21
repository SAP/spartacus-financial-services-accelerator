import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefillResolver } from './prefill-resolver.interface';
import { FormsUtils } from './utils/forms-utils';
import { UserAccountFacade } from '@spartacus/user/account/root';

@Injectable({
  providedIn: 'root',
})
export class UserPrefillResolver implements PrefillResolver {
  constructor(protected userAccountFacade: UserAccountFacade) {}

  getPrefillValue(fieldPath: string) {
    let currentValue;
    return this.userAccountFacade.get().pipe(
      map(user => {
        currentValue = FormsUtils.getValueByPath(fieldPath, user);
        return currentValue;
      })
    );
  }
}
