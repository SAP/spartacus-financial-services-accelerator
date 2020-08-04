import { MemoizedSelector, createSelector } from '@ngrx/store';
import {
  UserRequestState,
  StateWithUserRequest,
  FSUserRequestState,
} from '../user-request-state';

import * as fromFeature from '../reducers';
import * as fromUserRequest from '../reducers/user-request.reducer';
import { FSUserRequest } from '../../../../occ/occ-models';

export const getUserRequestState: MemoizedSelector<
  StateWithUserRequest,
  UserRequestState
> = createSelector(
  fromFeature.getUserRequestState,
  (userRequestState: FSUserRequestState) => userRequestState.userRequest
);

export const getUserRequestContent: MemoizedSelector<
  StateWithUserRequest,
  FSUserRequest
> = createSelector(getUserRequestState, fromUserRequest.getUserRequestContent);
