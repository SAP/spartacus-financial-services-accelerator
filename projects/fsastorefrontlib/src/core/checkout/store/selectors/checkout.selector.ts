import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  FSCheckoutDataState,
  FSCheckoutState,
  StateWithFSCheckout,
} from '../checkout-state';

import * as fromFeature from './feature.selector';

const getIdentificationTypeSelector = (state: FSCheckoutDataState) =>
  state.identificationType;

const getLegalInformationTypeSelector = (state: FSCheckoutDataState) =>
  state.legalInformation;

const getPaymentTypeSelector = (state: FSCheckoutDataState) =>
  state.paymentType;

export const getCheckoutState: MemoizedSelector<
  StateWithFSCheckout,
  FSCheckoutDataState
> = createSelector(
  fromFeature.getCheckoutState,
  (checkoutState: FSCheckoutState) => checkoutState.fscheckout
);

export const getIdentificationType: MemoizedSelector<
  StateWithFSCheckout,
  boolean
> = createSelector(getCheckoutState, getIdentificationTypeSelector);

export const getLegalInformation: MemoizedSelector<
  StateWithFSCheckout,
  boolean
> = createSelector(getCheckoutState, getLegalInformationTypeSelector);

export const getPaymentType: MemoizedSelector<
  StateWithFSCheckout,
  string
> = createSelector(getCheckoutState, getPaymentTypeSelector);
