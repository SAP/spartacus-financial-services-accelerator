import { Injectable, Optional } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';
import { InboxDataService } from './inbox-data.service';
import { BehaviorSubject } from 'rxjs';
import { SearchConfig } from '../services/inbox-data.service';
import { MessageToSend } from '../services/inbox-data.service';


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
  activeGroupTitle = this.activeGroupTitleSource.asObservable();
  activeMessageGroup = this.activeMessageGroupSource.asObservable();
  activeSortingFilter = this.activeSortingFilterSource.asObservable();
  messagesCollection: MessageToSend[] = [];
  protected callback: Function;

  setActiveGroupTitle( title: string ) {
    this.activeGroupTitleSource.next(title);
  }
  setActiveMessageGroup( messageGroup: string ) {
    this.activeMessageGroupSource.next(messageGroup);
  }
  selectedMessages(messageObject: MessageToSend) {
    const index = this.messagesCollection.map(function(e) { return e.messageUid; }).indexOf(messageObject.messageUid);
    if ( index === -1) {
      this.messagesCollection.push(messageObject);
    } else {
      this.messagesCollection.splice(index, 1);
    }
    console.log(this.messagesCollection);
  }
  getUidsFromMessagesCollection( meesagesCollecton) {
    const uids = [];
    meesagesCollecton.map(
      function(messageObj) {
        uids.push(messageObj.messageUid);
      }
    );
    return uids;
  }
  getMessagesAction(): Boolean {
    let readStatus = true;
    this.messagesCollection.map(function(message) {
      if (message.readDate) {
        readStatus = false;
      }
    });
    return readStatus;
  }
  initMessages() {
    this.store.pipe(select(fromSelector.getMessages)).subscribe(messages => {
      if (messages) {
        this.inboxData.messages = messages;
      }
      if (this.callback) {
        this.callback();
        this.callback = null;
      }
    });

    this.auth.getUserToken().subscribe(userData => {
      if (this.inboxData.userId !== userData.userId) {
        this.inboxData.userId = userData.userId;
      }
    });
  }

  loadMessagesByMessageGroup(messageGroup: string, searchConfig: SearchConfig) {
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

    readMessage(messageId: string) {
      this.changeSingleMessagesState(messageId);
    }

    changeSingleMessagesState(messsageGroupIds: string) {
      this.store.dispatch(
        new fromAction.LoadSingleMessage({
          userId: this.inboxData.userId,
          messagesUidList: messsageGroupIds,
          read: this.getMessagesAction()
        })
      );
    }
  
   changeMessagesState(messsageGroupIds: string[]) {
    this.store.dispatch(
      new fromAction.SetMessagesState({
        userId: this.inboxData.userId,
        messagesUidList: messsageGroupIds,
        read: this.getMessagesAction()
      })
    );
    this.callback = function() {
      let messageGroup;
      this.activeMessageGroup.subscribe( data => { messageGroup = data; });
      this.loadMessagesByMessageGroup(messageGroup, {});
    };
    this.messagesCollection = [];
  }

}
