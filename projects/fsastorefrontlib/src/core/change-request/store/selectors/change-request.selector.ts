import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromChangeRequest from './../reducers/change-request.reducer';

export const getChangeRequestState: MemoizedSelector<
  any,
  fromChangeRequest.ChangeRequestState
> = createSelector(
  fromFeature.getChangeRequestState,
  (changeRequestState: fromFeature.ChangeRequestState) =>
    changeRequestState.changeRequest
);

export const getChangeRequest: MemoizedSelector<any, any> = createSelector(
  getChangeRequestState,
  fromChangeRequest.getChangeRequest
);

export const getLoaded: MemoizedSelector<any, any> = createSelector(
  getChangeRequestState,
  fromChangeRequest.getLoaded
);
