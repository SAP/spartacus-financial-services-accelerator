import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService, OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { filter } from 'rxjs/operators';
import { FSUserRequest } from '../../../occ/occ-models';
import { UserRequestSelector } from '../store';
import * as fromReducer from '../store/reducers';

@Injectable()
export class UserRequestDataService {
  private _userId = OCC_USER_ID_ANONYMOUS;
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
          this._userId = OCC_USER_ID_ANONYMOUS;
        }
      });

    this.store
      .pipe(select(UserRequestSelector.getUserRequestContent))
      .subscribe(userRequest => {
        this._userRequest = userRequest;
      });
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
