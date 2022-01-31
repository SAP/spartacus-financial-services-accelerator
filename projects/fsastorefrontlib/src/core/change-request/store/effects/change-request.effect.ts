import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ChangeRequestConnector } from '../../connectors/change-request.connector';
import * as fromActions from '../actions';
import {
  GlobalMessageService,
  GlobalMessageType,
  OCC_USER_ID_CURRENT,
} from '@spartacus/core';
import { StepStatus } from '../../../../occ/occ-models';
import { UserRequestConnector } from '../../../user-request/connectors/user-request.connector';

@Injectable()
export class ChangeRequestEffects {
  createChangeRequest$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.CREATE_CHANGE_REQUEST),
      map((action: fromActions.CreateChangeRequest) => action.payload),
      mergeMap(payload => {
        return this.changeRequestConnector
          .createChangeRequestForPolicy(
            payload.policyId,
            payload.contractId,
            payload.changeRequestType,
            payload.userId
          )
          .pipe(
            map((changeRequest: any) => {
              return new fromActions.CreateChangeRequestSuccess(changeRequest);
            }),
            catchError(error => {
              this.showGlobalMessage('policy.changeError');
              return of(
                new fromActions.CreateChangeRequestFail(JSON.stringify(error))
              );
            })
          );
      })
    )
  );

  loadChangeRequest$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_CHANGE_REQUEST),
      map((action: fromActions.LoadChangeRequest) => action.payload),
      mergeMap(payload => {
        return this.changeRequestConnector
          .getChangeRequest(
            payload.userId ? payload.userId : OCC_USER_ID_CURRENT,
            payload.requestId
          )
          .pipe(
            map((changeRequest: any) => {
              console.log(changeRequest, 'effect');
              return new fromActions.LoadChangeRequestSuccess(changeRequest);
            }),
            catchError(error =>
              of(new fromActions.LoadChangeRequestFail(JSON.stringify(error)))
            )
          );
      })
    )
  );

  simulateChangeRequest$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.SIMULATE_CHANGE_REQUEST),
      map((action: fromActions.SimulateChangeRequest) => action.payload),
      mergeMap(payload => {
        return this.changeRequestConnector
          .simulateChangeRequest(
            payload.userId,
            payload.requestId,
            payload.changeRequest
          )
          .pipe(
            switchMap((changeRequest: any) => {
              return [
                new fromActions.SimulateChangeRequestSuccess(changeRequest),
                new fromActions.UpdateChangeRequest({
                  userId: payload.userId,
                  requestId: payload.requestId,
                  stepData: payload.stepData,
                }),
              ];
            }),
            catchError(error => {
              this.showGlobalMessage('policy.changeError');
              return of(
                new fromActions.SimulateChangeRequestFail(JSON.stringify(error))
              );
            })
          );
      })
    )
  );

  cancelChangeRequest$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.CANCEL_CHANGE_REQUEST),
      map((action: fromActions.CancelChangeRequest) => action.payload),
      mergeMap(payload => {
        return this.changeRequestConnector
          .cancelChangeRequest(payload.userId, payload.requestId)
          .pipe(
            map((changeRequest: any) => {
              return new fromActions.CancelChangeRequestSuccess(changeRequest);
            }),
            catchError(error =>
              of(new fromActions.CancelChangeRequestFail(JSON.stringify(error)))
            )
          );
      })
    )
  );

  submitChangeRequest$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.SUBMIT_CHANGE_REQUEST),
      map((action: fromActions.SubmitChangeRequest) => action.payload),
      mergeMap(payload => {
        return this.userRequestConnector
          .submitUserRequest(payload.userId, payload.requestId)
          .pipe(
            mergeMap(userRequest => {
              return [
                new fromActions.LoadChangeRequest(userRequest),
                new fromActions.SubmitChangeRequestSuccess(userRequest),
              ];
            }),
            catchError(error => {
              this.showGlobalMessage('policy.changeError');
              return of(
                new fromActions.SubmitChangeRequestFail(JSON.stringify(error))
              );
            })
          );
      })
    )
  );

  updateChangeRequest$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.UPDATE_CHANGE_REQUEST),
      map((action: fromActions.UpdateChangeRequest) => action.payload),
      switchMap(payload => {
        return this.userRequestConnector
          .updateUserRequest(
            payload.userId,
            payload.requestId,
            payload.stepData
          )
          .pipe(
            map((userRequest: any) => {
              const sequenceNumber = payload.stepData.sequenceNumber;
              const configSteps = userRequest.configurationSteps;
              if (
                configSteps &&
                configSteps.length > 0 &&
                sequenceNumber === configSteps.length &&
                configSteps[configSteps.length - 1].status ===
                  StepStatus.COMPLETED
              ) {
                return new fromActions.SubmitChangeRequest({
                  userId: payload.userId,
                  requestId: payload.requestId,
                });
              } else {
                return new fromActions.UpdateChangeRequestSuccess(userRequest);
              }
            }),
            catchError(error =>
              of(new fromActions.UpdateChangeRequestFail(JSON.stringify(error)))
            )
          );
      })
    )
  );

  private showGlobalMessage(text: string) {
    this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
    this.globalMessageService.add(
      { key: text },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  constructor(
    private actions$: Actions,
    private changeRequestConnector: ChangeRequestConnector,
    private userRequestConnector: UserRequestConnector,
    private globalMessageService: GlobalMessageService
  ) {}
}
