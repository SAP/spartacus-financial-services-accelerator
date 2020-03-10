import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUserRequest from '../reducers/user-request.reducer';
import { UserRequestState, StateWithUserRequest } from '../user-request-state';
import { FSUserRequest } from '../../../../occ/occ-models';

const getUserRequestContentSelector = (state: UserRequestState) =>
  state.content;

export const getUserRequestState: MemoizedSelector<
  any,
  UserRequestState
> = createSelector(
  fromFeature.getUserRequestState,
  (userRequestState: fromFeature.FSUserRequestState) =>
    userRequestState.userRequest
);

export const getUserRequestContent: MemoizedSelector<
  StateWithUserRequest,
  FSUserRequest
> = createSelector(
  getUserRequestState,
  getUserRequestContentSelector
);
