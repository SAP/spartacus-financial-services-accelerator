import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  FSCheckoutState,
  FSCheckoutStepsState,
  FSStateWithCheckout,
} from '../checkout-state';
import { getCheckoutState } from './feature.selector';
import { StateUtils } from '@spartacus/core';

const getIdentificationTypeSelector = (state: FSCheckoutStepsState) =>
  state.identificationType;

export const getCheckoutStepsState: MemoizedSelector<
  FSStateWithCheckout,
  StateUtils.LoaderState<FSCheckoutStepsState>
> = createSelector(
  getCheckoutState,
  (checkoutState: FSCheckoutState) => checkoutState.steps
);

export const getCheckoutSteps: MemoizedSelector<
  FSStateWithCheckout,
  FSCheckoutStepsState
> = createSelector(
  getCheckoutStepsState,
  state => StateUtils.loaderValueSelector(state)
);

export const getIdentificationType: MemoizedSelector<
  FSStateWithCheckout,
  boolean
> = createSelector(
  getCheckoutSteps,
  getIdentificationTypeSelector
);
