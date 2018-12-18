import * as fromPolicyDetailsAction from '../actions/policy-details.action';

export interface PolicyDetailsState {
  policy: any;
}

export const initialState: PolicyDetailsState = {
    policy: {}
};

export function reducer(
  state = initialState,
  action: fromPolicyDetailsAction.PolicyDetailsAction
): PolicyDetailsState {
  switch (action.type) {
    case fromPolicyDetailsAction.LOAD_POLICY_DETAILS_SUCCESS: {
      const policy = { ...action.payload };
      state.policy = policy;
      return {
        ...state,
        policy
      };
    }
    case fromPolicyDetailsAction.CLEAR_POLICY_DETAILS: {
      return initialState;
    }
  }
  return state;
}

export const getPolicyDetails = (state: PolicyDetailsState) => state.policy;