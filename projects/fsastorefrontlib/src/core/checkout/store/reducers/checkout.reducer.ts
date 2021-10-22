import * as fromAction from '../actions';
import { CheckoutAction } from '../actions/checkout.action';
import { CheckoutActions } from '@spartacus/checkout/core';
import { FSCheckoutDataState } from '..';

export const initialState: FSCheckoutDataState = {
  legalInformation: false,
  identificationType: false,
  paymentType: '',
};

export function reducer(
  state = initialState,
  action:
    | fromAction.CheckoutAction
    | CheckoutAction
    | CheckoutActions.CheckoutAction
    | CheckoutActions.CheckoutClearMiscsData
): FSCheckoutDataState {
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
      return {
        ...state,
        paymentType: action.payload.code,
      };
    }
  }
  return state;
}
