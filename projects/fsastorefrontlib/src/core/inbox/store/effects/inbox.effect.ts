import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as fromActions from '../actions';
import { InboxConnector } from '../../connectors/inbox.connector';

@Injectable()
export class InboxEffects {
  loadMessages$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_MESSAGES),
      exhaustMap((action: fromActions.LoadMessages) => {
        return this.inboxConnector
          .getSiteMessagesForUserAndGroup(
            action.payload.userId,
            action.payload.messageGroup,
            action.payload.searchConfig,
            action.payload.read
          )
          .pipe(
            map(
              (messages: any) =>
                new fromActions.LoadMessagesSuccess({
                  ...messages,
                  messageGroup: action.payload.messageGroup,
                })
            ),
            catchError(error =>
              of(new fromActions.LoadMessagesFail(JSON.stringify(error)))
            )
          );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private inboxConnector: InboxConnector
  ) {}
}
