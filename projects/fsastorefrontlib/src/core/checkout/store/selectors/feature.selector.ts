import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { CHECKOUT_FEATURE } from '@spartacus/core';
import { FSCheckoutState, FSStateWithCheckout } from '../checkout-state';

export const getCheckoutState: MemoizedSelector<
  FSStateWithCheckout,
  FSCheckoutState
> = createFeatureSelector<FSCheckoutState>(CHECKOUT_FEATURE);
