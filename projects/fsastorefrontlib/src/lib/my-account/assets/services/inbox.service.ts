import { Injectable } from '@angular/core';
import { AuthService, CmsService } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { Message, InboxDataService } from '../services/inbox-data.service';

@Injectable()
export class InboxService {
  constructor(
    private inboxData: InboxDataService,
    protected auth: AuthService,
    protected cmsService: CmsService
  ) {
    this.initInbox();
  }

  activeGroupTitleSource = new BehaviorSubject<string>('');
  activeMessageGroupSource = new BehaviorSubject<string>('');
  activeSortingFilterSource = new BehaviorSubject<string>('');
  readStatusSource = new BehaviorSubject<boolean>(false);
  checkAllMessagesSource = new BehaviorSubject<boolean>(false);
  activeGroupTitle = this.activeGroupTitleSource.asObservable();
  activeMessageGroup = this.activeMessageGroupSource.asObservable();
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

  setActiveGroupTitle(title: string) {
    this.activeGroupTitleSource.next(title);
  }
  resetMessagesToSend() {
    this.messagesCollection = [];
    this.readStatusSource.next(false);
  }
  setActiveMessageGroup(messageGroup: string) {
    this.activeMessageGroupSource.next(messageGroup);
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
