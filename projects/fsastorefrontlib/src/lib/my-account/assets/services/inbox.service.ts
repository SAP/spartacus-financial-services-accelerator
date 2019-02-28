import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';
import { InboxDataService } from './inbox-data.service';


@Injectable()
export class InboxService {
  constructor(
    private store: Store<fromReducer.UserState>,
    private inboxData: InboxDataService,
    protected auth: AuthService
  ) {
    this.initMessages();
  }

  callback: Function;

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

  loadMessagesByMessageGroup(messageGroup: string) {
      this.store.dispatch(
        new fromAction.LoadMessages({
          userId: this.inboxData.userId,
          messageGroup: messageGroup
        })
      );
    }
}
