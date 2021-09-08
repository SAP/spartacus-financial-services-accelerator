import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { InboxConnector } from '../../connectors/inbox.connector';

@Injectable()
export class InboxEffects {
  @Effect()
  loadMessages$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_MESSAGES),
    map((action: fromActions.LoadMessages) => action.payload),
    switchMap(payload => {
      return this.inboxConnector
        .getSiteMessagesForUserAndGroup(
          payload.userId,
          payload.messageGroup,
          payload.searchConfig,
          payload.read
        )
        .pipe(
          map((messages: any) => {
            return new fromActions.LoadMessagesSuccess(messages);
          }),
          catchError(error =>
            of(new fromActions.LoadMessagesFail(JSON.stringify(error)))
          )
        );
    })
  );
  constructor(
    private actions$: Actions,
    private inboxConnector: InboxConnector
  ) {}
}
