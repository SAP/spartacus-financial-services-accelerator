import { UserService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefillResolver } from './prefill-resolver.interface';

@Injectable({
  providedIn: 'root',
})
export class UserPrefillResolver implements PrefillResolver {
  constructor(protected userService: UserService) {}

  getFieldValue(fieldPath: string) {
    const attributes = fieldPath.split('.');
    let currentValue;
    return this.userService.get().pipe(
      map(user => {
        console.log(user);
        currentValue = user;
        attributes.forEach(attribute => {
          currentValue = currentValue[attribute];
        });
        return currentValue;
      })
    );
  }
}
