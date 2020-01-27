import { Policy } from './policy.reducer';
import * as fromAction from '../actions';

export interface ClaimPoliciesState {
  claimPoliciesData: {
    insurancePolicies: Policy[];
  };
  loaded: boolean;
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
  switch (action.type) {
    case fromAction.LOAD_CLAIM_POLICIES_SUCCESS: {
      const claimPoliciesData = { ...action.payload };
      return {
        ...state,
        claimPoliciesData,
        loaded: true,
      };
    }
  }
  return state;
}
export const getLoadedClaimPolicies = (state: ClaimPoliciesState) =>
  state.loaded;
