import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import * as fromReducer from '../store/reducers';
import { UserRequestDataService } from './user-request-data.service';
import * as fromAction from '../store/actions';

@Injectable()
export class UserRequestService {
  constructor(
    private store: Store<fromReducer.UserState>,
    private userRequestData: UserRequestDataService,
    protected auth: AuthService
  ) {
    //this.initClaims();
  }

  loadRequest(requestId: string) {
    this.store.dispatch(
      new fromAction.LoadUserRequest({
        userId: this.userRequestData.userId,
        requestId: requestId,
      })
    );
  }
}
