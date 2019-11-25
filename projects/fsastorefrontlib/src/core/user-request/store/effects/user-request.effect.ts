import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { UserRequestDataService } from '../../services';
import { OccUserRequestService } from '../../../../occ/services/user-request/user-request.service';

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
      return this.userRequestService
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
      return this.userRequestService
        .updateUserRequest(payload.userId, payload.requestId, payload.stepData)
        .pipe(
          map((userRequest: any) => {
            console.log(userRequest);
            return new fromActions.LoadUserRequestSuccess(userRequest);
          }),
          catchError(error => of(new fromActions.UpdateUserRequestFail(error)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private userRequestService: OccUserRequestService,
    private userRequestData: UserRequestDataService
  ) {}
}
