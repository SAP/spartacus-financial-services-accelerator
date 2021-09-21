import { StateUtils } from '@spartacus/core';
import { Pagination, Sort } from '@spartacus/core/src/model/unused.model';

export const INBOX_FEATURE = 'inbox';
export const INBOX_DATA = '[Inbox] Inbox Data';

export interface StateWithInbox {
  [INBOX_FEATURE]: InboxState;
}

export interface InboxState {
  inboxData: StateUtils.LoaderState<InboxDataState[]>;
}

export interface InboxDataState {
  messages: {};
  messageGroup: string;
  pagination?: Pagination;
  sorts?: Sort[];
}
