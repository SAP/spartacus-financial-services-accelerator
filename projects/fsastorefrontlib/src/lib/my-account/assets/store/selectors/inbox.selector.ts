import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromInbox from '../reducers/inbox.reducer';

export const getInboxState: MemoizedSelector<
  any,
  fromInbox.InboxState
> = createSelector(
  fromFeature.getUserState,
  (inboxState: fromFeature.UserState) => inboxState.messages
);

export const getMessages: MemoizedSelector<any, any> = createSelector(
  getInboxState,
  fromInbox.getMessages
);

export const getInboxRefresh: MemoizedSelector<any, boolean> = createSelector(
  getInboxState,
  fromInbox.getRefresh
);

export const getInboxsLoaded: MemoizedSelector<any, boolean> = createSelector(
  getInboxState,
  fromInbox.getLoaded
);
