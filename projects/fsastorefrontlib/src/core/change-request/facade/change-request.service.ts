import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import { OboCustomerService } from '@spartacus/dynamicforms';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { filter, switchMap, take } from 'rxjs/operators';
import { StepStatus } from '../../../occ/occ-models';
import * as fromAction from '../store/actions';
import { StateWithChangeRequest } from '../store/change-request-state';
import * as fromSelector from '../store/selectors';
import { getChangeRequestErrorFactory } from '../store/selectors';

@Injectable()
export class ChangeRequestService {
  constructor(
    protected store: Store<StateWithChangeRequest>,
    protected authService: AuthService,
    protected oboCustomerService: OboCustomerService
  ) {
    combineLatest([
      this.store.select(fromSelector.getChangeRequest),
      this.authService.isUserLoggedIn(),
      this.oboCustomerService.getOboCustomerUserId(),
    ])
      .subscribe(([changeRequest, userloggedIn, userId]) => {
        let requestId: string;
        if (changeRequest) {
          requestId = changeRequest.requestId;
        }
        if (!this.isCreated(changeRequest) && userloggedIn) {
          this.loadChangeRequest(requestId, userId);
        }
      })
      .unsubscribe();
  }

  createChangeRequest(
    policyId: string,
    contractId: string,
    changeRequestType: string
  ) {
    this.oboCustomerService
      .getOboCustomerUserId()
      .pipe(take(1))
      .subscribe(userId => {
        this.store.dispatch(
          new fromAction.CreateChangeRequest({
            policyId,
            contractId,
            changeRequestType,
            userId,
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

  loadChangeRequest(requestId: string, userId: string) {
    this.store.dispatch(
      new fromAction.LoadChangeRequest({ userId: userId, requestId: requestId })
    );
  }

  simulateChangeRequest(changeRequest, stepIndex) {
    const stepData = this.buildStepData(changeRequest, stepIndex);
    this.oboCustomerService
      .getOboCustomerUserId()
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
    this.oboCustomerService
      .getOboCustomerUserId()
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
    this.oboCustomerService
      .getOboCustomerUserId()
      .pipe(take(1))
      .subscribe(userId => {
        this.store.dispatch(
          new fromAction.UpdateChangeRequest({
            userId,
            requestId: changeRequest.requestId,
            stepData,
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
