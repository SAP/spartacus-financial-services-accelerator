import * as fromAction from './../actions';
import { CartState } from 'C:/spartacus/cloud-commerce-spartacus-storefront/projects/core/src/cart/store/cart-state';
import { OrderEntry } from '@spartacus/core';

export interface CartState {
  content: {},
  entries: {},
  refresh: boolean,
  cartMergeComplete: boolean,
}

export const initialState: CartState = {
  content: {},
  entries: {},
  refresh: false,
  cartMergeComplete: false,
};

export function reducer(
  state = initialState,
  action: fromAction.FSCartAction
): CartState {
  switch (action.type) {
    case fromAction.ADD_OPTIONAL_PRODUCT_SUCCESS: {
      console.log("REDUCER BEFORE REFRESH OF STATE")
      return {
        ...state,
        refresh: true
      };
    }
  }

  return state;
}

export const getRefresh = (state: CartState) => state.refresh;

