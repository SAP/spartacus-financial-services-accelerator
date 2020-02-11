import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { UserRequestDataService } from '../../services';
import { UserRequestConnector } from '../../connectors/user-request.connector';
@Injectable()
export class UserRequestEffects {
  @Effect()
  loadUserRequest$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_USER_REQUEST),
    map((action: fromActions.LoadUserRequest) => action.payload),
    mergeMap(payload => {
      if (payload === undefined || payload.userId === undefined) {
        payload = {
          userId: this.userRequestData.userId,
          requestId: this.userRequestData.requestId,
        };
      }
      return this.userRequestConnector
        .getUserRequest(payload.userId, payload.requestId)
        .pipe(
          map((userRequest: any) => {
            return new fromActions.LoadUserRequestSuccess(userRequest);
          }),
          catchError(error => of(new fromActions.LoadUserRequestFail(error)))
        );
    })
  );

  @Effect()
  updateUserRequest$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.UPDATE_USER_REQUEST),
    map((action: fromActions.UpdateUserRequest) => action.payload),
    switchMap(payload => {
      if (payload === undefined || payload.userId === undefined) {
        payload = {
          userId: this.userRequestData.userId,
          requestId: this.userRequestData.requestId,
        };
      }
      return this.userRequestConnector
        .updateUserRequest(payload.userId, payload.requestId, payload.stepData)
        .pipe(
          mergeMap((userRequest: any) => {
            return [
              new fromActions.LoadUserRequestSuccess(userRequest),
              new fromActions.UpdateClaim({
                userId: payload.userId,
                requestId: payload.requestId,
                claimData:
                  userRequest.configurationSteps[
                    payload.stepData.sequenceNumber - 1
                  ].yformConfigurator.content,
              }),
            ];
          }),
          catchError(error => of(new fromActions.UpdateUserRequestFail(error)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private userRequestConnector: UserRequestConnector,
    private userRequestData: UserRequestDataService
  ) {}
}
