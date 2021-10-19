import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { UserRequestConnector } from '../../connectors/user-request.connector';
import { StepStatus } from '../../../../occ/occ-models';

@Injectable()
export class UserRequestEffects {
  
  updateUserRequest$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(fromActions.UPDATE_USER_REQUEST),
    map((action: fromActions.UpdateUserRequest) => action.payload),
    switchMap(payload => {
      return this.userRequestConnector
        .updateUserRequest(payload.userId, payload.requestId, payload.stepData)
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
              return new fromActions.SubmitUserRequest({
                userId: payload.userId,
                requestId: payload.requestId,
              });
            } else {
              return new fromActions.UpdateUserRequestSuccess(userRequest);
            }
          }),
          catchError(error =>
            of(new fromActions.UpdateUserRequestFail(JSON.stringify(error)))
          )
        );
    })
  ));

  
  submitUserRequest$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(fromActions.SUBMIT_USER_REQUEST),
    map((action: fromActions.SubmitUserRequest) => action.payload),
    mergeMap(payload => {
      return this.userRequestConnector
        .submitUserRequest(payload.userId, payload.requestId)
        .pipe(
          mergeMap(userRequest => {
            return [
              new fromActions.LoadUserRequest(userRequest),
              new fromActions.SubmitUserRequestSuccess(userRequest),
            ];
          }),
          catchError(error =>
            of(new fromActions.SubmitUserRequestFail(JSON.stringify(error)))
          )
        );
    })
  ));

  constructor(
    private actions$: Actions,
    private userRequestConnector: UserRequestConnector
  ) {}
}
