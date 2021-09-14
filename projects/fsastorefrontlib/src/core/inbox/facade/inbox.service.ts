import { Injectable } from '@angular/core';
import { SearchConfig } from '@spartacus/core';
import { Store, select } from '@ngrx/store';
import * as fromAction from '../store/actions';
import * as fromSelector from '../store/selectors';
import { BehaviorSubject, Observable } from 'rxjs';
import { InboxDataService, InboxTab } from '../services/inbox-data.service';
import { InboxConnector } from '../connectors/inbox.connector';
import { filter, startWith, switchMap, take } from 'rxjs/operators';
import { StateWithInbox } from '../store';

export const GHOST_DATA = { values: new Array(5) };

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  constructor(
    protected inboxData: InboxDataService,
    protected adapter: InboxConnector,
    protected store: Store<StateWithInbox>
  ) {}

  messageGroupAndTitleSource = new BehaviorSubject<InboxTab>(null);
  activeMessageGroupAndTitle = this.messageGroupAndTitleSource.asObservable();

  messagesSource = new BehaviorSubject<boolean>(false);
  messages = this.messagesSource.asObservable();
  unreadMessagesStateSource = new BehaviorSubject<boolean>(false);
  unreadMessagesState$ = this.unreadMessagesStateSource.asObservable();

  setTitleAndMessageGroup(messageGroup: string, title: string) {
    this.messageGroupAndTitleSource.next({ messageGroup, title });
  }

  loadMessages(messageGroup, searchConfig: SearchConfig, read?: boolean) {
    this.store.dispatch(
      new fromAction.LoadMessages({
        userId: this.inboxData.userId,
        messageGroup: messageGroup,
        searchConfig: searchConfig,
        read: read,
      })
    );
  }

  getMessages(): Observable<any> {
    return this.store.select(fromSelector.getMessages).pipe(
      filter(messages => !!messages.loaded),
      take(1)
    );
  }

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
