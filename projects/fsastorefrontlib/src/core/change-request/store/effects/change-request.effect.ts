import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ChangeRequestConnector } from '../../connectors/change-request.connector';
import * as fromActions from '../actions';

@Injectable()
export class ChangeRequestEffects {
  @Effect()
  createChangeRequest$: Observable<any> = this.actions$.pipe(
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
          catchError(error =>
            of(new fromActions.CreateChangeRequestFail(JSON.stringify(error)))
          )
        );
    })
  );

  @Effect()
  loadChangeRequest$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_CHANGE_REQUEST),
    map((action: fromActions.LoadChangeRequest) => action.payload),
    mergeMap(payload => {
      return this.changeRequestConnector
        .getChangeRequest(payload.userId, payload.requestId)
        .pipe(
          map((changeRequest: any) => {
            return new fromActions.LoadChangeRequestSuccess(changeRequest);
          }),
          catchError(error =>
            of(new fromActions.LoadChangeRequestFail(JSON.stringify(error)))
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private changeRequestConnector: ChangeRequestConnector
  ) {}
}
