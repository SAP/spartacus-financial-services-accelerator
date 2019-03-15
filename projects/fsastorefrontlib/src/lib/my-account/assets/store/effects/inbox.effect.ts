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
             messagesUidList: this.inboxData.messageToSend.messagesUid,
             read: this.inboxData.messageToSend.read
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

  @Effect()
  changeMessageState$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_MESSAGE),
    map((action: fromActions.LoadSingleMessage) => action.payload),
    mergeMap(payload => {
        if (payload === undefined || payload.userId === undefined) {
          payload = {
             userId: this.inboxData.userId,
             message: this.inboxData.messages,
             read: true
          };
        }
        return this.inboxService.setMessagesState(payload.userId, payload.messagesUidList, payload.read )
          .pipe(
            map((response: any) => {
              return new fromActions.LoadSingleMessageSuccess(response);
            }),
            catchError(error => of(new fromActions.LoadSingleMessageFail(error)))
          );
      })
  );

  constructor(
    private actions$: Actions,
    private inboxService: OccInboxService,
    private inboxData: InboxDataService
  ) {}
}
