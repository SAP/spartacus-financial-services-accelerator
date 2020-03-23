import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromChangeRequest from '../reducers/change-request.reducer';
import * as fromFeature from './feature.selector';
import {
  ChangeRequestsState,
  ChangeRequestState,
  StateWithChangeRequest,
} from '../change-request-state';

export const getChangeRequestState: MemoizedSelector<
  StateWithChangeRequest,
  ChangeRequestState
> = createSelector(
  fromFeature.getChangeRequestState,
  (changeRequestsState: ChangeRequestsState) =>
    changeRequestsState.changeRequest
);

export const getChangeRequest: MemoizedSelector<
  StateWithChangeRequest,
  any
> = createSelector(
  getChangeRequestState,
  fromChangeRequest.getChangeRequest
);

export const getLoaded: MemoizedSelector<
  StateWithChangeRequest,
  any
> = createSelector(
  getChangeRequestState,
  fromChangeRequest.getLoaded
);
