import * as fromAction from '../actions';
import { PolicyState } from '../my-account-state';

export const initialState: PolicyState = {
  policies: {},
  policyDetails: null,
  loaded: false,
};

export function reducer(
  state = initialState,
  action: fromAction.PolicyAction
): PolicyState {
  switch (action.type) {
    case fromAction.LOAD_POLICIES_SUCCESS: {
      const policies = { ...action.payload };
      return {
        ...state,
        policies,
        loaded: true,
      };
    }
    case fromAction.LOAD_POLICY_DETAILS_SUCCESS: {
      const policyDetails = action.payload ? { ...action.payload } : null;
      return {
        ...state,
        policyDetails,
        loaded: true,
      };
    }
    case fromAction.CLEAR_POLICY_DETAILS: {
      return initialState;
    }
  }

  return state;
}

export const getPolicyData = (state: PolicyState) => state.policyDetails;
export const getPolicies = (state: PolicyState) => state.policies;
export const getLoaded = (state: PolicyState) => state.loaded;
