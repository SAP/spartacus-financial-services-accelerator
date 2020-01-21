import * as fromAction from '../actions';
import { Policy } from './policy.reducer';

export interface ClaimPoliciesState {
  claimPoliciesData: {
    insurancePolicies: Policy[];
  };
  refresh: boolean;
  loaded: boolean;
}

export const initialState: ClaimPoliciesState = {
  claimPoliciesData: {
    insurancePolicies: [],
  },
  refresh: false,
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
        refresh: false,
        loaded: true,
      };
    }
  }
  return state;
}

export const getLoadedClaimPolicies = (state: ClaimPoliciesState) =>
  state.loaded;
