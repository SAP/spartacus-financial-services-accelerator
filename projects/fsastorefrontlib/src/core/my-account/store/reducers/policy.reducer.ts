import * as fromAction from '../actions';

export interface Policy {
  policy: any;
}

export interface PolicyState {
  data: {};
  refresh: boolean;
  loaded: boolean;
}

export const initialState: PolicyState = {
  data: {},
  refresh: false,
  loaded: false,
};

export function reducer(
  state = initialState,
  action: fromAction.PolicyAction
): PolicyState {
  switch (action.type) {
    case fromAction.LOAD_POLICIES_SUCCESS:
    case fromAction.LOAD_POLICY_DETAILS_SUCCESS: {
      const data = { ...action.payload };
      return {
        ...state,
        data,
        refresh: false,
        loaded: true,
      };
    }
    case fromAction.CLEAR_POLICY_DETAILS: {
      return initialState;
    }
  }

  return state;
}

export const getPolicyData = (state: PolicyState) => state.data;
export const getRefresh = (state: PolicyState) => state.refresh;
export const getLoaded = (state: PolicyState) => state.loaded;
