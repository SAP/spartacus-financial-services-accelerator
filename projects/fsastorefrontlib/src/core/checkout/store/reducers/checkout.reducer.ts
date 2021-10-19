import { Order } from '@spartacus/core';
import * as fromAction from '../actions';
import { CheckoutAction } from '../actions/checkout.action';
import { FSCheckoutStepsState } from '../checkout-state';
import { CheckoutActions } from '@spartacus/checkout/core';

export const initialState: FSCheckoutStepsState = {
  legalInformation: false,
  identificationType: false,
  address: {},
  deliveryMode: {
    supported: {},
    selected: '',
  },
  paymentDetails: {},
  orderDetails: {},
  paymentType: '',
  poNumber: { po: undefined, costCenter: undefined },
};

export function reducer(
  state = initialState,
  action:
    | CheckoutAction
    | CheckoutActions.CheckoutAction
    | CheckoutActions.CheckoutClearMiscsData
): FSCheckoutStepsState {
  switch (action.type) {
    case fromAction.SET_IDENTIFICATION_TYPE_SUCCESS: {
      const identificationType = true;
      return {
        ...state,
        identificationType,
      };
    }
    case fromAction.SET_IDENTIFICATION_TYPE_FAIL: {
      const identificationType = false;
      return {
        ...state,
        identificationType,
      };
    }
    case fromAction.SET_LEGAL_INFORMATION_SUCCESS: {
      const legalInformation = true;
      return {
        ...state,
        legalInformation,
      };
    }
    case fromAction.SET_PAYMENT_TYPE_SUCCESS: {
      console.log(action);
      return {
        ...state,
        paymentType: action.payload.code,
      };
    }
    case CheckoutActions.CREATE_PAYMENT_DETAILS_SUCCESS:
    case CheckoutActions.SET_PAYMENT_DETAILS_SUCCESS: {
      return {
        ...state,
        paymentDetails: action.payload,
      };
    }

    case CheckoutActions.CREATE_PAYMENT_DETAILS_FAIL: {
      const paymentDetails = action.payload;
      if (paymentDetails['hasError']) {
        return {
          ...state,
          paymentDetails,
        };
      }

      return state;
    }

    case CheckoutActions.PLACE_ORDER_SUCCESS: {
      const orderDetails: Order = action.payload;

      return {
        ...state,
        orderDetails,
      };
    }

    case CheckoutActions.LOAD_CHECKOUT_DETAILS_SUCCESS: {
      return {
        ...state,
        address: action.payload.deliveryAddress,
        deliveryMode: {
          ...state.deliveryMode,
          selected:
            action.payload.deliveryMode && action.payload.deliveryMode.code,
        },
        paymentDetails: action.payload.paymentInfo,
      };
    }

    case CheckoutActions.CLEAR_CHECKOUT_DATA: {
      return initialState;
    }
  }
  return state;
}
