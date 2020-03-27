import { createSelector, MemoizedSelector } from '@ngrx/store';
import { LoaderState, StateLoaderSelectors } from '@spartacus/core';
import {
  FSCheckoutState,
  FSCheckoutStepsState,
  FSStateWithCheckout,
} from '../checkout-state';
import { getCheckoutState } from './feature.selector';

const getIdentificationTypeSelector = (state: FSCheckoutStepsState) =>
  state.identificationType;

export const getCheckoutStepsState: MemoizedSelector<
  FSStateWithCheckout,
  LoaderState<FSCheckoutStepsState>
> = createSelector(
  getCheckoutState,
  (checkoutState: FSCheckoutState) => checkoutState.steps
);

export const getCheckoutSteps: MemoizedSelector<
  FSStateWithCheckout,
  FSCheckoutStepsState
> = createSelector(
  getCheckoutStepsState,
  state => StateLoaderSelectors.loaderValueSelector(state)
);

export const getIdentificationType: MemoizedSelector<
  FSStateWithCheckout,
  boolean
> = createSelector(
  getCheckoutSteps,
  getIdentificationTypeSelector
);
