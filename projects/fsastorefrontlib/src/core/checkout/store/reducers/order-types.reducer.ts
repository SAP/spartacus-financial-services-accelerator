import { ORDER_TYPE } from '@spartacus/core';
import { CheckoutActions, OrderTypesState } from '@spartacus/checkout/core';

export const initialState: OrderTypesState = {
  selected: ORDER_TYPE.PLACE_ORDER,
};

export function reducer(
  state = initialState,
  action: CheckoutActions.OrderTypesActions | CheckoutActions.CheckoutAction
): OrderTypesState {
  switch (action.type) {
    case CheckoutActions.SET_ORDER_TYPE: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    case CheckoutActions.CLEAR_CHECKOUT_DATA: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
