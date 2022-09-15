import { Injectable } from '@angular/core';
import { InboxAdapter } from './inbox.adapter';
import { FSSearchConfig } from '../services/inbox-data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InboxConnector {
  constructor(protected adapter: InboxAdapter) {}

  getSiteMessagesForUserAndGroup(
    userId: string,
    messageGroup: string,
    searchConfig: FSSearchConfig,
    read?: boolean
  ): Observable<any> {
    return this.adapter.getSiteMessagesForUserAndGroup(
      userId,
      messageGroup,
      searchConfig,
      read
    );
  }

  setMessagesState(
    userId: string,
    messagesUidList: Array<string>,
    readStatus: boolean
  ): Observable<any> {
    return this.adapter.setMessagesState(userId, messagesUidList, readStatus);
  }
}
