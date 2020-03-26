import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { FSCheckoutState, FSStateWithCheckout } from '../fs-checkout-state';
import { CHECKOUT_FEATURE } from '@spartacus/core';

export const getCheckoutState: MemoizedSelector<
  FSStateWithCheckout,
  FSCheckoutState
> = createFeatureSelector<FSCheckoutState>(CHECKOUT_FEATURE);
