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

  activeGroupTitleSource = new BehaviorSubject<string>('General');
  activeMessageGroupSource = new BehaviorSubject<string>('');
  activeSortingFilterSource = new BehaviorSubject<string>('');
  readStatusSource = new BehaviorSubject<boolean>(false);
  activeGroupTitle = this.activeGroupTitleSource.asObservable();
  activeMessageGroup = this.activeMessageGroupSource.asObservable();
  activeSortingFilter = this.activeSortingFilterSource.asObservable();
  readStatus = this.readStatusSource.asObservable();
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
  selectedMessages(messageObject: Message ) {
    const index = this.messagesCollection.map(function(e) { return e.messageUid; }).indexOf(messageObject.messageUid);
    index === -1 ? this.messagesCollection.push(messageObject) : this.messagesCollection.splice(index, 1);
  }
  getUidsFromMessagesCollection( meesagesCollecton) {
    const uids = [];
    meesagesCollecton.map( messageObj =>
      uids.push(messageObj.messageUid)
    );
    return uids;
  }
  getMessagesAction() {
    let state = true;
    this.messagesCollection.map(function(message) {
      if ( message.readDate ) {
        state = false;
      }
    });
    this.readStatusSource.next(state);
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
  changeMessagesState(messsageGroupIds: string[]) {
    if ( messsageGroupIds.length === 0 ) {
      return;
    }
    this.store.dispatch(
      new fromAction.SetMessagesState({
        userId: this.inboxData.userId,
        messagesUidList: messsageGroupIds,
        read: this.readStatusSource.getValue()
      })
    );
    let readDate;
    this.readStatusSource.getValue() ? readDate = 'date' : readDate = undefined;
    this.messagesCollection.map( message => {
      message.readDate = readDate;
      return this.messagesCollection;
    }, this);
    let nextAction;
    this.readStatusSource.getValue() ? nextAction = false : nextAction = true;
    this.readStatusSource.next(nextAction);
  }
}
