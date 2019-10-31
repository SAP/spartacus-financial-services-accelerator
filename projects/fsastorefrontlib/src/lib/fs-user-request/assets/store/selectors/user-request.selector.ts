import { MemoizedSelector, createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';
import { UserRequestState, StateWithUserRequest } from '../user-request-state';
import { FSUserRequest } from 'projects/fsastorefrontlib/src/lib/occ-models';

 const getUserRequestContentSelector = (state: UserRequestState) => state.content;
 const getUserRequestRefreshSelector = (state: UserRequestState) => state.refresh;


 export const getFSUserRequestState: MemoizedSelector<
  StateWithUserRequest,
  fromFeature.FSUserRequestState
> = createFeatureSelector<fromFeature.FSUserRequestState>('userRequest');

export const getUserRequestState: MemoizedSelector<
  StateWithUserRequest,
  UserRequestState
> = createSelector(
  fromFeature.getUserState,
  (userRequestState: fromFeature.FSUserRequestState) =>
    userRequestState.userRequest
);


export const getUserRequestContent: MemoizedSelector<StateWithUserRequest, FSUserRequest> = createSelector(
  getUserRequestState,
  getUserRequestContentSelector
);

export const getUserRequestRefresh: MemoizedSelector<
  StateWithUserRequest,
  boolean
> = createSelector(
  getUserRequestState,
  getUserRequestRefreshSelector
);

