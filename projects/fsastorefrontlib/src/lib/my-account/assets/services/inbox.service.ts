import { Injectable } from '@angular/core';
import { AuthService, CmsService } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import {
  Message,
  InboxDataService,
  MessageGroupAndTitle,
} from '../services/inbox-data.service';

@Injectable()
export class InboxService {
  constructor(
    private inboxData: InboxDataService,
    protected auth: AuthService,
    protected cmsService: CmsService
  ) {
    this.initInbox();
  }

  messageGroupAndTitleSource = new BehaviorSubject<MessageGroupAndTitle>(null);
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

  initInbox() {
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
      .map(e => e.messageUid)
      .indexOf(messageObject.messageUid);
    index === -1
      ? this.messagesCollection.push(messageObject)
      : this.messagesCollection.splice(index, 1);
  }
  getUidsFromMessagesCollection(meesagesCollecton) {
    return meesagesCollecton.map(messageObj => messageObj.messageUid);
  }
  getMessagesAction() {
    let readState = true;
    this.messagesCollection.forEach(message => {
      if (message.readDate) {
        readState = false;
      }
    });
    this.readStatusSource.next(readState);
  }
}
