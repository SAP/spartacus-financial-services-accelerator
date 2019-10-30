import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';
import * as fromUserRequest from './../reducers/user-request.reducer';

export const getUserRequestState: MemoizedSelector<
  any,
  fromUserRequest.UserRequestState
> = createSelector(
  fromFeature.getUserState,
  (userState: fromFeature.UserState) => userState.userRequest
);

export const getUserRequestData: MemoizedSelector<any, any> = createSelector(
  getUserRequestState,
  fromUserRequest.getUserRequest
);

export const getUserRequestRefresh: MemoizedSelector<
  any,
  boolean
> = createSelector(
  getUserRequestState,
  fromUserRequest.getRefresh
);

export const getUserRequestLoaded: MemoizedSelector<
  any,
  boolean
> = createSelector(
  getUserRequestState,
  fromUserRequest.getLoaded
);
