import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from './feature.selector';
import {
  ChangeRequestsState,
  ChangeRequestState,
  StateWithChangeRequest,
} from '../change-request-state';
import { StateUtils } from '@spartacus/core';

export const getChangeRequestState: MemoizedSelector<
  StateWithChangeRequest,
  StateUtils.LoaderState<ChangeRequestState>
> = createSelector(
  fromFeature.getChangeRequestState,
  (changeRequestsState: ChangeRequestsState) =>
    changeRequestsState.changeRequest
);

export const getChangeRequest: MemoizedSelector<StateWithChangeRequest, any> =
  createSelector(
    getChangeRequestState,
    (state: StateUtils.LoaderState<ChangeRequestState>) => {
      return StateUtils.loaderValueSelector(state).content;
    }
  );

export const getLoaded: MemoizedSelector<StateWithChangeRequest, any> =
  createSelector(
    getChangeRequestState,
    (state: StateUtils.LoaderState<ChangeRequestState>) =>
      StateUtils.loaderValueSelector(state).loaded
  );

export const getChangeRequestErrorFactory: MemoizedSelector<
  StateWithChangeRequest,
  boolean
> = createSelector(
  getChangeRequestState,
  (loaderState: StateUtils.LoaderState<ChangeRequestState>) =>
    StateUtils.loaderErrorSelector(loaderState)
);
