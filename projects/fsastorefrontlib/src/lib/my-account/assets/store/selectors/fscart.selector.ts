import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';
import * as fromCart from './../reducers/fscart.reducer';

export const getCartState: MemoizedSelector<
  any,
  fromCart.CartState
> = createSelector(
  fromFeature.getCartState,
  (cartState: fromFeature.CartState) => cartState.carts
);

export const getRefresh: MemoizedSelector<any, boolean> = createSelector(
  getCartState,
  fromCart.getRefresh
);
