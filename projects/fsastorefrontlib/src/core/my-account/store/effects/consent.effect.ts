import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { ConsentConnector } from '../../connectors/consent.connector';

@Injectable()
export class ConsentEffects {
  constructor(
    private actions$: Actions,
    private consentConnector: ConsentConnector
  ) {}

  @Effect()
  loadConsents$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_CONSENTS),
    map((action: fromActions.LoadConsents) => action.payload),
    switchMap(payload => {
      return this.consentConnector.getConsents(payload.userId).pipe(
        map((consents: any) => {
          return new fromActions.LoadConsentsSuccess(consents);
        }),
        catchError(error =>
          of(new fromActions.LoadConsentsFail(JSON.stringify(error)))
        )
      );
    })
  );
}
