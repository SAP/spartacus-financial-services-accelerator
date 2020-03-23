import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from './feature.selector';
import {
  ChangeRequestsState,
  ChangeRequestState,
  StateWithChangeRequest,
} from '../change-request-state';
import { LoaderState, StateLoaderSelectors } from '@spartacus/core';

export const getChangeRequestState: MemoizedSelector<
  StateWithChangeRequest,
  LoaderState<ChangeRequestState>
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
  (state: LoaderState<ChangeRequestState>) =>
    StateLoaderSelectors.loaderValueSelector(state)
);

export const getLoaded: MemoizedSelector<
  StateWithChangeRequest,
  any
> = createSelector(
  getChangeRequestState,
  (state: LoaderState<ChangeRequestState>) =>
    StateLoaderSelectors.loaderLoadingSelector(state)
);

export function getChangeRequestErrorFactory(): MemoizedSelector<
  StateWithChangeRequest,
  boolean
> {
  return createSelector(
    getChangeRequestState,
    (loaderState: LoaderState<ChangeRequestState>) =>
      StateLoaderSelectors.loaderErrorSelector(loaderState)
  );
}
