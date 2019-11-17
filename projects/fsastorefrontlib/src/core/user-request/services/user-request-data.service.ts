import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import { filter } from 'rxjs/operators';
import { FSStepData, FSUserRequest } from '../../../occ/occ-models';
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
      .getUserToken()
      .pipe(filter(userToken => this.userId !== userToken.userId))
      .subscribe(userToken => {
        if (Object.keys(userToken).length !== 0) {
          this._userId = userToken.userId;
        }
      });
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

  updateUserRequestStep(
    fsRequest: FSUserRequest,
    activeStepIndex: number,
    data: any,
    stepStatus: string
  ): FSStepData {
    const stepData = Object.assign(
      {
        yformConfigurator: data['id'],
      },
      fsRequest.configurationSteps[activeStepIndex]
    );
    stepData.status = stepStatus;
    return stepData;
  }
}
