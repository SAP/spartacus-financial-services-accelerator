import * as fromAction from './../actions';

export interface Policy {
  policyId?: string;
}

export interface PolicyState {
  policies: {};
  refresh: boolean;
  loaded: boolean;
}

export const initialState: PolicyState = {
  policies: {},
  refresh: false,
  loaded: false
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
        refresh: false,
        loaded: true
      };
    }
  }

  return state;
}

export const getPolicies = (state: PolicyState) => state.policies;
export const getRefresh = (state: PolicyState) => state.refresh;
export const getLoaded = (state: PolicyState) => state.loaded;
