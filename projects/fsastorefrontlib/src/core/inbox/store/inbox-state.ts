import { Pagination, Sort } from '@spartacus/core/src/model/unused.model';

export const INBOX_FEATURE = 'inbox';

export interface StateWithInbox {
  [INBOX_FEATURE]: InboxState;
}

export interface InboxState {
  messages: {};
  pagination?: Pagination;
  sorts?: Sort[];
  refresh?: boolean;
  loaded?: boolean;
}
