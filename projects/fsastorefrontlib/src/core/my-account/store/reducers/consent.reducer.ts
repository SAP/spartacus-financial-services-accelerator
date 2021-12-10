import * as fromAction from '../actions';
import { ConsentState } from '../my-account-state';

export const initialState: ConsentState = {
  consents: {},
  customer: {},
  customerQuotes: [],
  customerPolicies: {},
  customerClaims: {},
  loaded: false,
};

export function reducer(
  state = initialState,
  action: fromAction.ConsentAction
): ConsentState {
  switch (action.type) {
    case fromAction.LOAD_CONSENTS_SUCCESS: {
      const consents = { ...action.payload };
      return {
        ...state,
        consents,
        loaded: true,
      };
    }
    case fromAction.LOAD_CUSTOMER_SUCCESS: {
      const customer = action.payload ? { ...action.payload } : null;
      return {
        ...state,
        customer,
        loaded: true,
      };
    }
    case fromAction.LOAD_CUSTOMER_ASSETS_SUCCESS: {
      console.log(action.payload)
      const customerQuotes = action.payload ? [...action.payload] : [];
      const customerPolicies = action.payload ? { ...action.payload } : null;
      const customerClaims = action.payload ? { ...action.payload } : null;
      return {
        ...state,
        customerQuotes,
        customerPolicies,
        customerClaims,
        loaded: true,
      };
    }
  //   case fromAction.LOAD_CUSTOMER_QUOTES_SUCCESS: {
  //     const customerQuotes = action.payload ? [...action.payload] : [];
  //     return {
  //       ...state,
  //       customerQuotes,
  //       loaded: true,
  //     };
  //   }
  //   case fromAction.LOAD_CUSTOMER_POLICIES_SUCCESS: {
  //     const customerPolicies = action.payload ? { ...action.payload } : null;
  //     return {
  //       ...state,
  //       customerPolicies,
  //       loaded: true,
  //     };
  //   }
  //   case fromAction.LOAD_CUSTOMER_CLAIMS_SUCCESS: {
  //     const customerClaims = action.payload ? { ...action.payload } : null;
  //     return {
  //       ...state,
  //       customerClaims,
  //       loaded: true,
  //     };
  //   }
  }
  return state;
}

export const getConsents = (state: ConsentState) => state.consents;
export const getCustomer = (state: ConsentState) => state.customer;
export const getCustomerQuotes = (state: ConsentState) => state.customerQuotes;
export const getCustomerPolicies = (state: ConsentState) =>
  state.customerPolicies;
export const getCustomerClaims = (state: ConsentState) => state.customerClaims;
export const getLoaded = (state: ConsentState) => state.loaded;
