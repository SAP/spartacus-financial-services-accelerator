import { Injectable } from '@angular/core';
import { SearchConfig } from '@spartacus/core';
import { Store, select } from '@ngrx/store';
import * as fromAction from '../store/actions';
import * as fromSelector from '../store/selectors';
import { BehaviorSubject, Observable } from 'rxjs';
import { InboxDataService, InboxTab } from '../services/inbox-data.service';
import { InboxConnector } from '../connectors/inbox.connector';
import { filter, map, startWith, switchMap, take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import * as InboxActions from '../store/actions/inbox.action';
import { InboxDataState, StateWithInbox } from '../store/inbox-state';

export const GHOST_DATA = { values: new Array(5) };

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  constructor(
    protected inboxData: InboxDataService,
    protected adapter: InboxConnector,
    protected store: Store<StateWithInbox>,
    private actions$: Actions
  ) {}

  messageGroupAndTitleSource = new BehaviorSubject<InboxTab>(null);
  activeMessageGroupAndTitle = this.messageGroupAndTitleSource.asObservable();

  // messagesSource = new BehaviorSubject<boolean>(false);
  // messages$ = this.messagesSource.asObservable();
  unreadMessagesStateSource = new BehaviorSubject<boolean>(false);
  unreadMessagesState$ = this.unreadMessagesStateSource.asObservable();

  setTitleAndMessageGroup(messageGroup: string, title: string) {
    this.messageGroupAndTitleSource.next({ messageGroup, title });
  }

  setMessagesSource(
    msgGroup,
    searchConfig: SearchConfig,
    read?: boolean
  ): Observable<InboxDataState[]> {
    return this.getMessages().pipe(
      take(1),
      map(inboxData => {
        const uniqueMessageGroup =
          inboxData.findIndex(
            (inboxSingleData: InboxDataState) =>
              inboxSingleData.messageGroup === msgGroup &&
              !inboxSingleData.pagination['hasNext']
          ) === -1;
        if (uniqueMessageGroup) {
          this.loadMessages(msgGroup, searchConfig, read);
        } else {
          return inboxData.filter(
            (inboxGroup: InboxDataState) => inboxGroup.messageGroup === msgGroup
          );
        }
      })
    );
  }

  setGhostData(): Observable<any> {
    return this.actions$.pipe(
      ofType(InboxActions.LOAD_MESSAGES_SUCCESS),
      startWith(GHOST_DATA),
      take(1)
    );
  }

  getMessages(): Observable<InboxDataState[]> {
    return this.store.select(fromSelector.getMessages);
  }

  loadMessages(msgGroup, searchConfig: SearchConfig, read?: boolean) {
    this.store.dispatch(
      new fromAction.LoadMessages({
        userId: this.inboxData.userId,
        messageGroup: msgGroup,
        searchConfig: searchConfig,
        read: read,
      })
    );
  }
  // getLoaded(): Observable<boolean> {
  //   return this.store.pipe(select(fromSelector.getMessagesLoading));
  // }

  // getMessages(): Observable<any> {
  //   return this.getLoaded().pipe(
  //     filter(loaded => !!loaded),
  //     take(1),
  //     switchMap(_ => this.store.select(fromSelector.getMessages))
  //   );
  // }

  // getMessageGroup(): Observable<any> {
  //   return this.store.select(fromSelector.getMessageGroup);
  // }

  // getMessages(
  //   messageGroup,
  //   searchConfig: SearchConfig,
  //   read?: boolean
  // ): Observable<any> {
  //   return this.adapter
  //     .getSiteMessagesForUserAndGroup(
  //       this.inboxData.userId,
  //       messageGroup,
  //       searchConfig,
  //       read
  //     )
  //     .pipe(startWith(GHOST_DATA));
  // }

  setMessagesState(uidList, read): Observable<any> {
    return this.adapter.setMessagesState(this.inboxData.userId, uidList, read);
  }

  setUnreadMessageState(isMessageRead: boolean) {
    this.unreadMessagesStateSource.next(isMessageRead);
  }
}
