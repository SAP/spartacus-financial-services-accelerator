import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { OccInboxService } from 'projects/fsastorefrontlib/src/lib/occ/inbox/inbox.service';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { InboxDataService } from '../../services/inbox-data.service';
import * as fromActions from '../actions';


@Injectable()
export class InboxEffects {
  @Effect()
  loadMessagesByCode$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_MESSAGES),
    map((action: fromActions.LoadQuotes) => action.payload),
    mergeMap(payload => {
        if (payload === undefined || payload.userId === undefined) {
          payload = {
             userId: this.inboxData.userId,
             messageGroup: this.inboxData.messageGroup,
             messages: this.inboxData.messages
          };
        }
        return this.inboxService.getSiteMessagesForUserAndGroup(payload.userId, payload.messageGroup)
          .pipe(
            map((messages: any) => {
              return new fromActions.LoadMessagesSuccess(messages);
            }),
            catchError(error => of(new fromActions.LoadMessagesFail(error)))
          );
      })
  );

  constructor(
    private actions$: Actions,
    private inboxService: OccInboxService,
    private inboxData: InboxDataService
  ) {}
}
