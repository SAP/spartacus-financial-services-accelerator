import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { UserRequestDataService } from '../../services';
import { OccUserRequestAdapter } from '../../../../occ/services/user-request/occ-user-request.adapter';
import { ClaimDataService, ClaimService } from '../../../my-account/services';

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
      return this.userRequestAdapter
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
      return this.userRequestAdapter
        .updateUserRequest(payload.userId, payload.requestId, payload.stepData)
        .pipe(
          map((userRequest: any) => {
            return new fromActions.LoadUserRequestSuccess(userRequest);
          }),
          tap(userRequest => {
            this.claimService.updateClaim(
              payload.userId,
              payload.requestId,
              userRequest.payload.configurationSteps[
                payload.stepData.sequenceNumber - 1
              ].yformConfigurator.content,
              this.claimServiceData.content.claimNumber
            );
          }),
          catchError(error => of(new fromActions.UpdateUserRequestFail(error)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private userRequestAdapter: OccUserRequestAdapter,
    private userRequestData: UserRequestDataService,
    private claimServiceData: ClaimDataService,
    private claimService: ClaimService
  ) {}
}
