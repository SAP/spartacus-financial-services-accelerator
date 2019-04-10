import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';
import { InboxDataService } from './inbox-data.service';
import { BehaviorSubject } from 'rxjs';
import { FSSearchConfig } from '../services/inbox-data.service';
import { Message } from '../services/inbox-data.service';


@Injectable()
export class InboxService {
  constructor(
    private store: Store<fromReducer.UserState>,
    private inboxData: InboxDataService,
    protected auth: AuthService
  ) {
    this.initMessages();
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

  setActiveGroupTitle( title: string ) {
    this.activeGroupTitleSource.next(title);
  }
  resetMessagesToSend() {
    this.messagesCollection = [];
    this.readStatusSource.next(false);
  }
  setActiveMessageGroup( messageGroup: string ) {
    this.activeMessageGroupSource.next(messageGroup);
  }
  selectedMessages(messageObject: Message) {
    const index = this.messagesCollection.map(e => { return e.messageUid; }).indexOf(messageObject.messageUid);
    index === -1 ? this.messagesCollection.push(messageObject) : this.messagesCollection.splice(index, 1);
  }
  getUidsFromMessagesCollection(meesagesCollecton) {
    return meesagesCollecton.map(messageObj => messageObj.messageUid);
  }
  getMessagesAction() {
    let readState = true;
    this.messagesCollection.map(function(message) {
      if ( message.readDate ) {
        readState = false;
      }
    });
    this.readStatusSource.next(readState);
  }
  initMessages() {
    this.store.pipe(select(fromSelector.getMessages)).subscribe( messages => {
      if (messages) {
        this.inboxData.messages = messages;
      }
    });
    this.auth.getUserToken().subscribe(userData => {
      if (this.inboxData.userId !== userData.userId) {
        this.inboxData.userId = userData.userId;
      }
    });
  }
  loadMessagesByMessageGroup(messageGroup: string, searchConfig: FSSearchConfig) {
    this.store.dispatch(
      new fromAction.LoadMessages({
        userId: this.inboxData.userId,
        messageGroup: messageGroup,
        searchConfig: searchConfig
      })
    );
  }
  changeMessageListState() {
    this.changeMessagesState(this.getUidsFromMessagesCollection(this.messagesCollection));
  }
  readSingleMessage(messageId: string) {
    this.store.dispatch(
      new fromAction.SetMessagesState({
        userId: this.inboxData.userId,
        messagesUidList: messageId,
        read: true
      })
    );
  }
  changeMessagesState(messsageIds: string[]) {
    if ( messsageIds.length === 0 ) {
      return;
    }
    this.store.dispatch(
      new fromAction.SetMessagesState({
        userId: this.inboxData.userId,
        messagesUidList: messsageIds,
        read: this.readStatusSource.getValue()
      })
    );
    const readDate = this.readStatusSource.getValue() ?  'date' :  undefined;
    this.messagesCollection.map( message => {
      message.readDate = readDate;
      return this.messagesCollection;
    }, this);
    const nextAction = this.readStatusSource.getValue() ? false :  true;
    this.readStatusSource.next(nextAction);
  }
}
