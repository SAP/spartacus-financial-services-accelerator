import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as fromReducer from '../../store/reducers';
import { FSUserRequest } from '../../../../occ/occ-models';
import { UserRequestSelector } from '../../store';
import * as fromAction from '../../store/actions/index';
import { UserRequestDataService } from '../user-request-data.service';
import { FormDataService } from '@fsa/dynamicforms';

@Injectable()
export class UserRequestService {
  constructor(
    protected userRequestData: UserRequestDataService,
    protected store: Store<fromReducer.FSUserRequestState>,
    protected formDataService: FormDataService
  ) {}

  getUserRequest(): Observable<FSUserRequest> {
    this.store
      .select(UserRequestSelector.getUserRequestContent)
      .pipe(
        map(storedUserRequestData => {
          if (!this.areConfigurationStepsCreated(storedUserRequestData)) {
            this.loadUserRequestData();
          }
        })
      )
      .subscribe();
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

  resumeRequest(requestId: string): Observable<FSUserRequest> {
    this.store.dispatch(
      new fromAction.LoadUserRequest({
        userId: this.userRequestData.userId,
        requestId: requestId,
      })
    );
    return this.store.select(UserRequestSelector.getUserRequestContent);
  }

  loadUserRequestFormData(userRequest: FSUserRequest) {
    userRequest.configurationSteps.forEach(stepData => {
      if (stepData.yformConfigurator) {
        this.formDataService.setFormDataToLocalStorage(
          stepData.yformConfigurator
        );
      }
    });
  }

  updateUserRequestStep(
    userRequest: FSUserRequest,
    stepIndex: number,
    stepStatus: string
  ): Observable<FSUserRequest> {
    const stepData = Object.assign(
      {},
      userRequest.configurationSteps[stepIndex],
      {
        status: stepStatus,
      }
    );
    this.store.dispatch(
      new fromAction.UpdateUserRequest({
        userId: this.userRequestData.userId,
        requestId: userRequest.requestId,
        stepData: stepData,
      })
    );
    return this.store.select(UserRequestSelector.getUserRequestContent);
  }

  private areConfigurationStepsCreated(userRequest: FSUserRequest): boolean {
    return userRequest && typeof userRequest.configurationSteps !== 'undefined';
  }
}
