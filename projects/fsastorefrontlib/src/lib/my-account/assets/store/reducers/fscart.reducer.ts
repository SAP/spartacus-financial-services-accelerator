import * as fromAction from './../actions';
import { CartState } from '@spartacus/core';

export const initialState: CartState = {
  content: {},
  entries: {},
  refresh: false,
  loaded: false,
  cartMergeComplete: false,
};

export function reducer(
  state = initialState,
  action: fromAction.CartAction
): CartState {
  switch (action.type) {
    case fromAction.ADD_OPTIONAL_PRODUCT_SUCCESS: {
      return {
        ...state,
        refresh: true
      };
    }
  }

  return state;
}

 export const getRefresh = (state: CartState) => state.refresh;
 export const getEntries = (state: CartState) => state.entries;

