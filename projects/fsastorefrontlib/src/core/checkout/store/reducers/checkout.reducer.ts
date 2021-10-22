import { FSCheckoutDataState } from '../checkout-state';
import * as fromAction from '../actions';

export const initialState: FSCheckoutDataState = {
  legalInformation: false,
  identificationType: false,
  paymentType: '',
};

export function reducer(
  state = initialState,
  action: fromAction.CheckoutAction
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
