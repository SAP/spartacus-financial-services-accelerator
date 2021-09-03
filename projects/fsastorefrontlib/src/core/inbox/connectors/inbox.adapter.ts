import { FSSearchConfig } from '../services/inbox-data.service';
import { Observable } from 'rxjs';

export abstract class InboxAdapter {
  /**
   * Abstract method used to get site messages for specified message group
   *
   * @param userId The user id
   * @param messageGroup The message group
   * @param searchConfig The search configuration defined by sort code and order
   * @param read The read/unread messages
   */
  abstract getSiteMessagesForUserAndGroup(
    userId: string,
    messageGroup: string,
    searchConfig: FSSearchConfig,
    read?: boolean
  ): Observable<any>;

  /**
   * Abstract method used to change state of site messages
   *
   * @param userId The user id
   * @param messagesUidList The list of site message uids
   * @param readStatus Based on this param messages should be read or unread
   */
  abstract setMessagesState(
    userId: string,
    messagesUidList: Array<string>,
    readStatus: boolean
  ): Observable<any>;
}
