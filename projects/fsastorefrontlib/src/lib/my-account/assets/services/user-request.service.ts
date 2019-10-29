import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import { UserRequestDataService } from './user-request-data.service';

@Injectable()
export class UserRequestService {
  constructor(
    private store: Store<fromReducer.UserState>,
    private userRequestData: UserRequestDataService
  ) {}

  loadRequest(requestId: string) {
    this.store.dispatch(
      new fromAction.LoadUserRequest({
        userId: this.userRequestData.userId,
        requestId: requestId,
      })
    );
  }
}
