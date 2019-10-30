import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import { filter } from 'rxjs/operators';
import { FSUserRequest } from '../../../occ-models';
import { UserRequestSelector } from 'projects/fsastorefrontlib/src/lib/fs-user-request/assets/store';
import * as fromReducer from 'projects/fsastorefrontlib/src/lib/fs-user-request/assets/store/reducers';
export const ANONYMOUS_USERID = 'anonymous';

@Injectable()
export class UserRequestDataService {
  private _userId = ANONYMOUS_USERID;
  private _userRequest: FSUserRequest;

  constructor(
    private store: Store<fromReducer.FSUserRequestState>,
    protected authService: AuthService
      ) {
    this.authService
    .getUserToken()
    .pipe(filter(userToken => this.userId !== userToken.userId))
    .subscribe(userToken => {
      if (Object.keys(userToken).length !== 0) {
        this._userId = userToken.userId;
      } else {
        this._userId = ANONYMOUS_USERID;
      }
    });
    this.store.pipe(select(UserRequestSelector.getUserRequestData)).subscribe(userRequest => {
      this._userRequest = userRequest;
      console.log(userRequest);
    });


  }

  set userId(val) {
    this._userId = val;
  }

  hasUserRequest(): boolean {
    return !!this.userRequest;
  }

  get userId(): string {
    return this._userId;
  }

  get userRequest(): FSUserRequest {
    return this._userRequest;
  }

  get requestId(): string {
    if (this.hasUserRequest) {
      return this.userRequest.requestId;
    }
  }
}
