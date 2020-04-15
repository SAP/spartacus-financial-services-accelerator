import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from './feature.selector';
import {
  FormDefinitionsState,
  FormDefinitionState,
  StateWithFormDefinition,
} from '../form-definition-state';
import { LoaderState, StateLoaderSelectors } from '@spartacus/core';

export const getFormDefinitionState: MemoizedSelector<
  StateWithFormDefinition,
  LoaderState<FormDefinitionState>
> = createSelector(
  fromFeature.getFormDefinitionState,
  (changeRequestsState: FormDefinitionsState) =>
    changeRequestsState.formDefinition
);

export const getFormDefinition: MemoizedSelector<
  StateWithFormDefinition,
  any
> = createSelector(
  getFormDefinitionState,
  (state: LoaderState<FormDefinitionState>) => {
    return StateLoaderSelectors.loaderValueSelector(state).content;
  }
);

export const getLoaded: MemoizedSelector<
  StateWithFormDefinition,
  any
> = createSelector(
  getFormDefinitionState,
  (state: LoaderState<FormDefinitionState>) =>
    StateLoaderSelectors.loaderValueSelector(state).loaded
);

export const getFormDefinitionErrorFactory: MemoizedSelector<
  StateWithFormDefinition,
  boolean
> = createSelector(
  getFormDefinitionState,
  (loaderState: LoaderState<FormDefinitionState>) =>
    StateLoaderSelectors.loaderErrorSelector(loaderState)
);
