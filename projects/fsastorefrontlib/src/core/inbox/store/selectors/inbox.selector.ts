import {
  MemoizedSelector,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromInbox from '../reducers/inbox.reducer';
import { InboxState, StateWithInbox } from '../inbox-state';
import { INBOX_FEATURE } from '..';

export const getInboxState: MemoizedSelector<
  StateWithInbox,
  InboxState
> = createFeatureSelector<InboxState>(INBOX_FEATURE);

export const getMessages: MemoizedSelector<
  StateWithInbox,
  any
> = createSelector(getInboxState, fromInbox.getMessages);
