import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';
import * as fromCart from './../reducers/fscart.reducer';
import { CartState } from '@spartacus/core';

export const getCartState: MemoizedSelector<
  any,
  CartState
> = createSelector(
  fromFeature.getUserState,
  (cartState: fromFeature.UserState) => cartState.cart
);

export const getCart: MemoizedSelector<any, any> = createSelector(
  getCartState,
  fromCart.getEntries
);

export const getCartRefresh: MemoizedSelector<any, boolean> = createSelector(
  getCartState,
  fromCart.getRefresh
);
