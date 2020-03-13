import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { UserRequestConnector } from '../../connectors/user-request.connector';

@Injectable()
export class UserRequestEffects {
  @Effect()
  updateUserRequest$: Observable<any> = this.actions$.pipe(
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
              configSteps[configSteps.length - 1].status === 'COMPLETED'
            ) {
              return new fromActions.SubmitUserRequest({
                userId: payload.userId,
                requestId: payload.requestId,
              });
            } else {
              return new fromActions.UpdateUserRequestSuccess(userRequest);
            }
          }),
          catchError(error => of(new fromActions.UpdateUserRequestFail(error)))
        );
    })
  );

  @Effect()
  submitUserRequest$: Observable<any> = this.actions$.pipe(
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
  );

  constructor(
    private actions$: Actions,
    private userRequestConnector: UserRequestConnector
  ) {}
}
