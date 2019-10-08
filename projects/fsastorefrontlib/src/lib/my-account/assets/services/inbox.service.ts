import { Injectable } from '@angular/core';
import { AuthService } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { Message, InboxDataService } from '../services/inbox-data.service';
import { Store } from '@ngrx/store';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';

@Injectable()
export class InboxService {
  constructor(
    private store: Store<fromReducer.UserState>,
    private inboxData: InboxDataService,
    protected auth: AuthService
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
    this.messagesCollection.forEach(function (message) {
      if (message.readDate) {
        readState = false;
      }
    });
    this.readStatusSource.next(readState);
  }
}
