import { FSSearchConfig } from './../../../core/my-account/services/inbox-data.service';
import { Observable } from 'rxjs';

export abstract class InboxAdapter {
  /**
   * Abstract method used to get site message for specific message group
   *
   * @param userId The user id
   * @param messageGroup The message group
   * @param searchConfig The search configuratio defined by sort code and order
   */
  abstract getSiteMessagesForUserAndGroup(
    userId: string,
    messageGroup: string,
    searchConfig: FSSearchConfig
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
