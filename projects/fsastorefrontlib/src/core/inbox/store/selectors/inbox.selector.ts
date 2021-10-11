import {
  MemoizedSelector,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromInbox from '../reducers/inbox.reducer';
import { InboxState, StateWithInbox } from '../inbox-state';
import { InboxDataState, INBOX_FEATURE } from '..';
import { LoaderState } from '@spartacus/core/src/state/utils/loader';
import { StateUtils } from '@spartacus/core';

export const getInboxState: MemoizedSelector<
  StateWithInbox,
  InboxState
> = createFeatureSelector<InboxState>(INBOX_FEATURE);

export const getInboxDataState: MemoizedSelector<
  StateWithInbox,
  LoaderState<InboxDataState[]>
> = createSelector(
  getInboxState,
  (inboxState: InboxState) => inboxState.inboxData
);

export const getInboxContent: MemoizedSelector<
  StateWithInbox,
  InboxDataState[]
> = createSelector(getInboxDataState, (state: LoaderState<InboxDataState[]>) =>
  StateUtils.loaderValueSelector(state)
);

export const getMessagesLoading: MemoizedSelector<
  StateWithInbox,
  boolean
> = createSelector(getInboxDataState, (state: LoaderState<InboxDataState[]>) =>
  StateUtils.loaderLoadingSelector(state)
);

export const getLoadedMessagesSuccess: MemoizedSelector<
  StateWithInbox,
  boolean
> = createSelector(
  getInboxDataState,
  (state: LoaderState<InboxDataState[]>) =>
    StateUtils.loaderSuccessSelector(state) &&
    !StateUtils.loaderLoadingSelector(state)
);
