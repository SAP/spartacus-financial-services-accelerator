import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromReducer from '../../store/reducers';
import { Observable } from 'rxjs';
import { FSUserRequest } from 'projects/fsastorefrontlib/src/lib/occ-models';
import { UserRequestSelector } from '../../store';
import * as fromAction from '../../store/actions/index';
import { map } from 'rxjs/operators';
import { UserRequestDataService } from '../user-request-data.service';
import { UserRequestState } from '../../store/reducers/user-request.reducer';

@Injectable()
export class UserRequestService {

  constructor(
    protected userRequestData: UserRequestDataService,
    protected store: Store<fromReducer.FSUserRequestState>,
    ) {
  }

  getUserRequest(): Observable<FSUserRequest> {
    this.store.select(UserRequestSelector.getUserRequestData)
    .pipe(
      map(storedUserRequestData => {
        if (!this.areConfigurationStepsCreated(storedUserRequestData)) {
          this.loadUserRequestData();
        }
      })
    ).subscribe();
    return this.store.select(UserRequestSelector.getUserRequestData);
  }

  loadUserRequestData(): void {
    this.store.dispatch(
      new fromAction.LoadUserRequest({
        userId: this.userRequestData.userId,
        requestId: this.userRequestData.requestId,
      })
    );
  }

  private areConfigurationStepsCreated(userRequest: UserRequestState): boolean {
    return userRequest && typeof userRequest !== 'undefined';
  }
}
