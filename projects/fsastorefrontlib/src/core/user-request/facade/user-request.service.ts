import { Injectable } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActionsSubject, Store } from '@ngrx/store';
import * as fromReducer from '../store/reducers';
import { FSUserRequest } from '../../../occ/occ-models';
import { UserRequestSelector } from '../store/selectors';
import * as fromAction from '../store/actions/index';
import { UserRequestDataService } from './../services/user-request-data.service';
import { FormDataService } from '@fsa/dynamicforms';

@Injectable()
export class UserRequestService {
  constructor(
    protected actions$: ActionsSubject,
    protected userRequestData: UserRequestDataService,
    protected store: Store<fromReducer.FSUserRequestState>,
    protected formDataService: FormDataService
  ) {}

  getAction(actionName): Observable<any> {
    return this.actions$.pipe(filter(action => action.type === actionName));
  }

  getUserRequest(): Observable<any> {
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

    return this.store.select(UserRequestSelector.getLoaded).pipe(
      filter(loaded => loaded),
      switchMap(() => {
        return this.store.select(UserRequestSelector.getUserRequest);
      })
    );
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
    return this.store.select(UserRequestSelector.getUserRequest);
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
  ) {
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
  }

  private areConfigurationStepsCreated(userRequest: FSUserRequest): boolean {
    return userRequest && typeof userRequest.configurationSteps !== 'undefined';
  }
}
