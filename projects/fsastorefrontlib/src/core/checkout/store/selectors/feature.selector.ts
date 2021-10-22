import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  FSCheckoutState,
  FS_CHECKOUT_FEATURE,
  StateWithFSCheckout,
} from '../checkout-state';

export const getCheckoutState: MemoizedSelector<
  StateWithFSCheckout,
  FSCheckoutState
> = createFeatureSelector<FSCheckoutState>(FS_CHECKOUT_FEATURE);
