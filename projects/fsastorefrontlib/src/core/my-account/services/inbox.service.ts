import { Injectable } from '@angular/core';
import { AuthService, CmsService } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message, InboxDataService, InboxTab, FSSearchConfig } from './inbox-data.service';
import { OccInboxService } from 'projects/fsastorefrontlib/src/occ/services/inbox/inbox.service';

@Injectable()
export class InboxService {
  constructor(
    private inboxData: InboxDataService,
    protected auth: AuthService,
    protected cmsService: CmsService,
    protected occInboxService: OccInboxService,
  ) {
    this.initInbox();
  }

  messageGroupAndTitleSource = new BehaviorSubject<InboxTab>(null);
  activeMessageGroupAndTitle = this.messageGroupAndTitleSource.asObservable();

  // Leftovers from previous implementation. Maybe can be used in the next task
  activeSortingFilterSource = new BehaviorSubject<string>('');
  readStatusSource = new BehaviorSubject<boolean>(false);
  checkAllMessagesSource = new BehaviorSubject<boolean>(false);
  activeSortingFilter = this.activeSortingFilterSource.asObservable();
  readStatus = this.readStatusSource.asObservable();
  checkAllMessages = this.checkAllMessagesSource.asObservable();
  messagesCollection: Message[] = [];
  protected callback: Function;

  readMessagesUidList: string[] = [];

  selectedIndex;
  searchConfig: FSSearchConfig = {};

  messagesSource = new BehaviorSubject<any>(false);
  messages$ = this.messagesSource.asObservable();

  initInbox() {
    this.checkAllMessagesSource.next(false);
    this.auth.getUserToken().subscribe(userData => {
      if (this.inboxData.userId !== userData.userId) {
        this.inboxData.userId = userData.userId;
      }
    });
  }

  setTitleAndMessageGroup(messageGroup: string, title: string) {
    this.messageGroupAndTitleSource.next({ messageGroup, title });
  }

  // Leftovers from previous implementation. Maybe can be used in the next task
  resetMessagesToSend() {
    this.messagesCollection = [];
    this.readStatusSource.next(false);
  }

  selectedMessages(messageObject: Message) {
    const index = this.messagesCollection
      .map(e => e.uid)
      .indexOf(messageObject.uid);
    index === -1
      ? this.messagesCollection.push(messageObject)
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
    this.readStatusSource.next(readState);
    return readState;
  }

  getMessages(messageGroup): Observable<any> {
    this.selectedIndex = -1;
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
    return this.occInboxService.setMessagesState('current', uidList, read);
  }

}
