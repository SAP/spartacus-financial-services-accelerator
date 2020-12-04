import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import {
  FSCheckoutState,
  FSCheckoutStepsState,
  FSStateWithCheckout,
} from '../checkout-state';
import { getCheckoutState } from './feature.selector';

const getIdentificationTypeSelector = (state: FSCheckoutStepsState) =>
  state.identificationType;

const getLegalInformationTypeSelector = (state: FSCheckoutStepsState) =>
  state.legalInformation;

const getPaymentTypeSelector = (state: FSCheckoutStepsState) =>
  state.paymentType;

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
> = createSelector(getCheckoutStepsState, state =>
  StateUtils.loaderValueSelector(state)
);

export const getIdentificationType: MemoizedSelector<
  FSStateWithCheckout,
  boolean
> = createSelector(getCheckoutSteps, getIdentificationTypeSelector);

export const getLegalInformation: MemoizedSelector<
  FSStateWithCheckout,
  boolean
> = createSelector(getCheckoutSteps, getLegalInformationTypeSelector);

export const getPaymentType: MemoizedSelector<
  FSStateWithCheckout,
  string
> = createSelector(getCheckoutSteps, getPaymentTypeSelector);
