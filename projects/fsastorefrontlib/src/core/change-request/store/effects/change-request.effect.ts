import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { ChangeRequestConnector } from '../../connectors/change-request.connector';

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

  constructor(
    private actions$: Actions,
    private changeRequestConnector: ChangeRequestConnector
  ) {}
}
