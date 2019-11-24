import { Injectable } from '@angular/core';
import { AuthService, CmsService } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OccInboxService } from './../../../occ/services/inbox/inbox.service';
import {
  FSSearchConfig,
  InboxDataService,
  InboxTab,
  Message,
} from './inbox-data.service';

@Injectable()
export class InboxService {
  constructor(
    private inboxData: InboxDataService,
    protected auth: AuthService,
    protected cmsService: CmsService,
    protected occInboxService: OccInboxService
  ) {
    this.initInbox();
  }

  messageGroupAndTitleSource = new BehaviorSubject<InboxTab>(null);
  activeMessageGroupAndTitle = this.messageGroupAndTitleSource.asObservable();

  checkAllMessagesSource = new BehaviorSubject<boolean>(false);
  checkAllMessages = this.checkAllMessagesSource.asObservable();

  accordionStateSource = new BehaviorSubject<number>(-1);
  accordionState = this.accordionStateSource.asObservable();

  mainCheckboxSource = new BehaviorSubject<boolean>(false);
  mainCheckBox = this.mainCheckboxSource.asObservable();

  messagesSource = new BehaviorSubject<boolean>(false);
  messages = this.messagesSource.asObservable();

  messagesCollection: Message[] = [];
  readMessagesUidList: string[] = [];

  searchConfig: FSSearchConfig = {};

  initInbox() {
    this.checkAllMessagesSource.next(false);
  }

  setTitleAndMessageGroup(messageGroup: string, title: string) {
    this.messageGroupAndTitleSource.next({ messageGroup, title });
  }

  // Leftovers from previous implementation. Maybe can be used in the next task
  resetMessagesToSend() {
    this.messagesCollection = [];
  }

  selectedMessages(messageObject: Message) {
    const index = this.messagesCollection
      .map(e => e.uid)
      .indexOf(messageObject.uid);
    index === -1
      ? this.messagesCollection = [...this.messagesCollection, messageObject]
      : this.messagesCollection.splice(index, 1);
  }

  getUidsFromMessagesCollection(): string[] {
    return this.messagesCollection.map(messageObj => messageObj.uid);
  }

  getMessagesAction(): boolean {
    let readState = true;
    this.messagesCollection.forEach(message => {
      if (message.readDate) {
        readState = false;
      }
    });
    return readState;
  }

  getMessages(messageGroup): Observable<any> {
    return this.occInboxService.getSiteMessagesForUserAndGroup(
      this.inboxData.userId,
      messageGroup,
      this.searchConfig
    );
  }

  sortMessages(sortCode, sortOrder, messageGroup): Observable<any> {
    this.resetMessagesToSend();
    this.searchConfig.sortCode = sortCode;
    this.searchConfig.sortOrder = sortOrder;
    return this.occInboxService.getSiteMessagesForUserAndGroup(
      this.inboxData.userId,
      messageGroup,
      this.searchConfig
    );
  }

  setMessagesState(uidList, read): Observable<any> {
    return this.occInboxService.setMessagesState(this.inboxData.userId, uidList, read);
  }
}
