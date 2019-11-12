import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as fromReducer from '../../store/reducers';
import { FSUserRequest } from '../../../../occ/occ-models';
import { UserRequestSelector } from '../../store';
import * as fromAction from '../../store/actions/index';
import { UserRequestDataService } from '../user-request-data.service';

@Injectable()
export class UserRequestService {
  constructor(
    protected userRequestData: UserRequestDataService,
    protected store: Store<fromReducer.FSUserRequestState>
  ) {}

  getUserRequest(): Observable<FSUserRequest> {
    // Should read user request data from store. Commented until update of user request is finished.
    // New http request is triggered on every step currently.

    // this.store
    //   .select(UserRequestSelector.getUserRequestContent)
    //   .pipe(
    //     map(storedUserRequestData => {
    //       if (!this.areConfigurationStepsCreated(storedUserRequestData)) {
    //         this.loadUserRequestData();
    //       }
    //     })
    //   )
    //   .subscribe();
    this.loadUserRequestData();
    return this.store.select(UserRequestSelector.getUserRequestContent);
  }

  loadUserRequestData(): void {
    if (this.userRequestData.requestId) {
      this.store.dispatch(
        new fromAction.LoadUserRequest({
          userId: this.userRequestData.userId,
          requestId: this.userRequestData.requestId,
        })
      );
    }
  }

  private areConfigurationStepsCreated(userRequest: FSUserRequest): boolean {
    return userRequest && typeof userRequest.configurationSteps !== 'undefined';
  }
}
