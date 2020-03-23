import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromChangeRequest from './../reducers/change-request.reducer';
import { LoaderState, StateLoaderSelectors } from '@spartacus/core';

export const getChangeRequestState: MemoizedSelector<
  any,
  LoaderState<fromChangeRequest.ChangeRequestState>
> = createSelector(
  fromFeature.getChangeRequestState,
  (changeRequestState: fromFeature.ChangeRequestState) =>
    changeRequestState.changeRequest
);

export const getChangeRequest: MemoizedSelector<any, any> = createSelector(
  getChangeRequestState,
  state => StateLoaderSelectors.loaderValueSelector(state)
);

export const getLoaded: MemoizedSelector<any, any> = createSelector(
  getChangeRequestState,
  state => StateLoaderSelectors.loaderLoadingSelector(state)
);

export function getProcessErrorFactory<T>(
  processId: string
): MemoizedSelector<fromFeature.ChangeRequestState, boolean> {
  return createSelector(
    getChangeRequestState,
    loaderState => StateLoaderSelectors.loaderErrorSelector(loaderState)
  );
}
