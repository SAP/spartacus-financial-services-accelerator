import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import { filter, take } from 'rxjs/operators';
import { FSUserRequest } from '../../../occ/occ-models';
import { UserRequestSelector } from '../store';
import * as fromReducer from '../store/reducers';

@Injectable()
export class UserRequestDataService {
  private _userId;
  private _userRequest: FSUserRequest;

  constructor(
    private store: Store<fromReducer.FSUserRequestState>,
    protected authService: AuthService
  ) {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId => (this._userId = occUserId));

    this.store
      .pipe(select(UserRequestSelector.getUserRequestContent))
      .subscribe(userRequest => {
        this._userRequest = userRequest;
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
