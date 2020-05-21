import { UserService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PrefilResolver } from './prefil-resolver.interface';

@Injectable({
  providedIn: 'root',
})
export class UserPrefilResolver implements PrefilResolver {
  constructor(protected userService: UserService) {}

  // maybe this can also accept control and set value directly in here...
  getFieldValue(fieldPath: string) {
    const attributes = fieldPath.split('.');
    let currentValue;
    return this.userService.get().pipe(
      map(user => {
        currentValue = user;
        attributes.forEach(attribute => {
          currentValue = currentValue[attribute];
        });
        return currentValue;
      })
    );
  }
}