import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { OccInboxService } from '../../../../occ/inbox/inbox.service';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { InboxDataService } from '../../services/inbox-data.service';
import * as fromActions from '../actions';


@Injectable()
export class InboxEffects {
  @Effect()
  loadMessagesByCode$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_MESSAGES),
    map((action: fromActions.LoadMessages) => action.payload),
    mergeMap(payload => {
      if (payload === undefined || payload.userId === undefined || payload.messageGroup === undefined) {
        payload = {
            userId: this.inboxData.userId,
            messageGroup: this.inboxData.messageGroup,
            messages: this.inboxData.messages,
            searchConfig : this.inboxData.searchConfig
        };
      }
      return this.inboxService.getSiteMessagesForUserAndGroup(payload.userId, payload.messageGroup, payload.searchConfig )
        .pipe(
          map((messages: any) => {
            return new fromActions.LoadMessagesSuccess(messages);
          }),
          catchError(error => of(new fromActions.LoadMessagesFail(error)))
        );
    })
  );
  @Effect()
  changeMessagesState$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.SET_MESSAGES_STATE),
    map((action: fromActions.SetMessagesState) => action.payload),
    mergeMap(payload => {
        if (payload === undefined || payload.userId === undefined) {
          payload = {
             userId: this.inboxData.userId,
             messagesUidList: this.inboxData.messagesCollection.messages,
             read: this.inboxData.messagesCollection.read
          };
        }
        return this.inboxService.setMessagesState(payload.userId, payload.messagesUidList, payload.read )
          .pipe(
            map((response: any) => {
              return new fromActions.SetMessagesStateSuccess(response);
            }),
            catchError(error => of(new fromActions.SetMessagesStateError(error)))
          );
      })
  );
  constructor(
    private actions$: Actions,
    private inboxService: OccInboxService,
    private inboxData: InboxDataService
  ) {}
}
