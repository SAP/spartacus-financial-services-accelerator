import { Injectable } from '@angular/core';
import { AuthService } from '@spartacus/core';
import { filter } from 'rxjs/operators';
import { OCC_USER_ID_ANONYMOUS } from '@spartacus/core';

@Injectable()
export class PolicyDataService {
  private _userId = OCC_USER_ID_ANONYMOUS;

  constructor(protected auth: AuthService) {
    this.auth
      .getUserToken()
      .pipe(filter(userToken => this.userId !== userToken.userId))
      .subscribe(userToken => {
        if (Object.keys(userToken).length !== 0) {
          this.userId = userToken.userId;
        } else {
          this.userId = OCC_USER_ID_ANONYMOUS;
        }
      });
  }

  set userId(val) {
    this._userId = val;
  }
  get userId(): string {
    return this._userId;
  }
}
