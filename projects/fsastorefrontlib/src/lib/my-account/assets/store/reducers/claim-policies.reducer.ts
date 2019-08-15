import * as fromAction from '../actions';

export interface ClaimPolicies {
  ClaimPolicy?: any;
}

export interface ClaimPoliciesState {
  claimPoliciesData: {};
  refresh: boolean;
  loaded: boolean;
}

export const initialState: ClaimPoliciesState = {
  claimPoliciesData: {},
  refresh: false,
  loaded: false
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
        loaded: true
      };
    }
  }
  return state;
}

export const getClaimPoliciesData = (state: ClaimPoliciesState) => state.claimPoliciesData;
export const getRefreshClaimPolicies = (state: ClaimPoliciesState) => state.refresh;
export const getLoadedClaimPolicies = (state: ClaimPoliciesState) => state.loaded;
