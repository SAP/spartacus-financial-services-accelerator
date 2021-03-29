import { UserService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefillResolver } from './prefill-resolver.interface';
import { FormsUtils } from './utils/forms-utils';

@Injectable({
  providedIn: 'root',
})
export class UserPrefillResolver implements PrefillResolver {
  constructor(protected userService: UserService) {}

  getPrefillValue(fieldPath: string) {
    const attributes = fieldPath.split('.');
    let currentValue;
    return this.userService.get().pipe(
      map(user => {
        currentValue = FormsUtils.getValueByPath(fieldPath, user);
        return currentValue;
      })
    );
  }
}
