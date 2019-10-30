import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';
import * as fromUserRequest from './../reducers/user-request.reducer';

 const getUserRequest = (state: fromUserRequest.UserRequestState) => state.userRequest;
 const getRefresh = (state: fromUserRequest.UserRequestState) => state.refresh;
 const getLoaded = (state: fromUserRequest.UserRequestState) => state.loaded;


export const getUserRequestState: MemoizedSelector<
  any,
  fromUserRequest.UserRequestState
> = createSelector(
  fromFeature.getUserState,
  (userRequestState: fromFeature.FSUserRequestState) =>
    userRequestState.userRequest
);


export const getUserRequestData: MemoizedSelector<any, any> = createSelector(
  getUserRequestState,
  getUserRequest
);

export const getUserRequestRefresh: MemoizedSelector<
  any,
  boolean
> = createSelector(
  getUserRequestState,
  getRefresh
);

export const getUserRequestLoaded: MemoizedSelector<
  any,
  boolean
> = createSelector(
  getUserRequestState,
  getLoaded
);
