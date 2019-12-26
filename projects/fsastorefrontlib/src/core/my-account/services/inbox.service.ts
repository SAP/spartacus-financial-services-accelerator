import { Injectable } from '@angular/core';
import { AuthService, CmsService, SearchConfig } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OccInboxAdapter } from './../../../occ/services/inbox/occ-inbox.adapter';
import { InboxDataService, InboxTab } from './inbox-data.service';

@Injectable()
export class InboxService {
  constructor(
    private inboxData: InboxDataService,
    protected auth: AuthService,
    protected cmsService: CmsService,
    protected occInboxAdapter: OccInboxAdapter
  ) {}

  messageGroupAndTitleSource = new BehaviorSubject<InboxTab>(null);
  activeMessageGroupAndTitle = this.messageGroupAndTitleSource.asObservable();

  messagesSource = new BehaviorSubject<boolean>(false);
  messages = this.messagesSource.asObservable();

  setTitleAndMessageGroup(messageGroup: string, title: string) {
    this.messageGroupAndTitleSource.next({ messageGroup, title });
  }

  getMessages(messageGroup, searchConfig: SearchConfig): Observable<any> {
    return this.occInboxAdapter.getSiteMessagesForUserAndGroup(
      this.inboxData.userId,
      messageGroup,
      searchConfig
    );
  }

  setMessagesState(uidList, read): Observable<any> {
    return this.occInboxAdapter.setMessagesState(
      this.inboxData.userId,
      uidList,
      read
    );
  }
}
