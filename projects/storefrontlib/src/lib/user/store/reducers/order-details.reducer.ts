import * as fromOrderDetailsAction from '../actions/order-details.action';

export interface OrderDetailsState {
  order: any;
}

export const initialState: OrderDetailsState = {
  order: {}
};

export function reducer(
  state = initialState,
  action: fromOrderDetailsAction.OrderDetailsAction
): OrderDetailsState {
  switch (action.type) {
    case fromOrderDetailsAction.LOAD_ORDER_DETAILS_SUCCESS: {
      const order = action.payload;

      return {
        ...state,
        order
      };
    }
    case fromOrderDetailsAction.CLEAR_ORDER_DETAILS: {
      return initialState;
    }
  }
  return state;
}

export const getOrderDetails = (state: OrderDetailsState) => state.order;
