import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { AuthService, UserIdService } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { filter, switchMap, take } from 'rxjs/operators';
import * as fromAction from '../store/actions';
import * as fromSelector from '../store/selectors';
import { StateWithChangeRequest } from '../store/change-request-state';
import { StepStatus } from '../../../occ/occ-models';
import { getChangeRequestErrorFactory } from '../store/selectors';

@Injectable()
export class ChangeRequestService {
  requestId: string;

  constructor(
    protected store: Store<StateWithChangeRequest>,
    protected authService: AuthService,
    protected userIdService: UserIdService
  ) {
    combineLatest([
      this.store.select(fromSelector.getChangeRequest),
      this.authService.isUserLoggedIn(),
    ])
      .subscribe(([changeRequest, userloggedIn]) => {
        if (changeRequest) {
          this.requestId = changeRequest.requestId;
        }
        if (!this.isCreated(changeRequest) && userloggedIn) {
          this.loadChangeRequest();
        }
      })
      .unsubscribe();
  }

  createChangeRequest(
    policyId: string,
    contractId: string,
    changeRequestType: string
  ) {
    this.userIdService
      .getUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        this.store.dispatch(
          new fromAction.CreateChangeRequest({
            policyId: policyId,
            contractId: contractId,
            changeRequestType: changeRequestType,
            userId: occUserId,
          })
        );
      })
      .unsubscribe();
  }

  getChangeRequest(): Observable<any> {
    return this.store.select(fromSelector.getLoaded).pipe(
      filter(loaded => loaded),
      take(1),
      switchMap(_ => {
        return this.store.select(fromSelector.getChangeRequest);
      })
    );
  }

  loadChangeRequest() {
    this.userIdService
      .getUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        if (this.requestId) {
          this.store.dispatch(
            new fromAction.LoadChangeRequest({
              userId: occUserId,
              requestId: this.requestId,
            })
          );
        }
      })
      .unsubscribe();
  }

  simulateChangeRequest(changeRequest, stepIndex) {
    const stepData = this.buildStepData(changeRequest, stepIndex);
    this.userIdService
      .getUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        this.store.dispatch(
          new fromAction.SimulateChangeRequest({
            userId: occUserId,
            requestId: changeRequest.requestId,
            changeRequest: changeRequest,
            stepData: stepData,
          })
        );
      })
      .unsubscribe();
  }
  cancelChangeRequest(requestId: string) {
    this.userIdService
      .getUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        this.store.dispatch(
          new fromAction.CancelChangeRequest({
            userId: occUserId,
            requestId: requestId,
          })
        );
      })
      .unsubscribe();
  }

  getChangeRequestError(): Observable<boolean> {
    return this.store.pipe(select(getChangeRequestErrorFactory));
  }

  updateChangeRequest(changeRequest, stepIndex) {
    const stepData = this.buildStepData(changeRequest, stepIndex);
    this.userIdService
      .getUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        this.store.dispatch(
          new fromAction.UpdateChangeRequest({
            userId: occUserId,
            requestId: changeRequest.requestId,
            stepData: stepData,
          })
        );
      })
      .unsubscribe();
  }

  private buildStepData(changeRequest: any, stepIndex: number): any {
    return Object.assign({}, changeRequest.configurationSteps[stepIndex], {
      status: StepStatus.COMPLETED,
    });
  }

  private isCreated(changeRequest: any): boolean {
    return changeRequest && changeRequest.configurationSteps !== undefined;
  }
}
