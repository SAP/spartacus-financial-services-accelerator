import * as fromAction from '../actions';
import { ClaimPoliciesState } from '../my-account-state';

export interface Policy {
  policy: any;
}

export const initialState: ClaimPoliciesState = {
  claimPoliciesData: {
    insurancePolicies: [],
  },
  loaded: false,
};

export function reducer(
  state = initialState,
  action: fromAction.ClaimPoliciesAction
): ClaimPoliciesState {
  if (action.type === fromAction.LOAD_CLAIM_POLICIES_SUCCESS) {
    const claimPoliciesData = { ...action.payload };
    return {
      ...state,
      claimPoliciesData,
      loaded: true,
    };
  }
  return state;
}

export const getLoadedClaimPolicies = (state: ClaimPoliciesState) =>
  state.loaded;
