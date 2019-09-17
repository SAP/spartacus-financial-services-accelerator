import { MemoizedSelector, createSelector, createFeatureSelector } from '@ngrx/store';

import { FSStateWithCheckout, FSCheckoutState, FSCheckoutStepsState } from '../fs-checkout-state';
import { CHECKOUT_FEATURE, LoaderState, StateLoaderSelectors } from '@spartacus/core';

const getIdentificationTypeSelector = (state: FSCheckoutStepsState) => state.identificationType;

export const getCheckoutState: MemoizedSelector<
    FSStateWithCheckout,
    FSCheckoutState
> = createFeatureSelector<FSCheckoutState>(CHECKOUT_FEATURE);

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
