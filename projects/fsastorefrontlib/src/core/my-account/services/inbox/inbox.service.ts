import { Injectable } from '@angular/core';
import { SearchConfig } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InboxDataService, InboxTab } from './inbox-data.service';
import { InboxConnector } from './index';

@Injectable()
export class InboxService {
  constructor(
    private inboxData: InboxDataService,
    protected adapter: InboxConnector
  ) {}

  messageGroupAndTitleSource = new BehaviorSubject<InboxTab>(null);
  activeMessageGroupAndTitle = this.messageGroupAndTitleSource.asObservable();

  messagesSource = new BehaviorSubject<boolean>(false);
  messages = this.messagesSource.asObservable();

  setTitleAndMessageGroup(messageGroup: string, title: string) {
    this.messageGroupAndTitleSource.next({ messageGroup, title });
  }

  getMessages(messageGroup, searchConfig: SearchConfig): Observable<any> {
    return this.adapter.getSiteMessagesForUserAndGroup(
      this.inboxData.userId,
      messageGroup,
      searchConfig
    );
  }

  setMessagesState(uidList, read): Observable<any> {
    return this.adapter.setMessagesState(this.inboxData.userId, uidList, read);
  }
}
