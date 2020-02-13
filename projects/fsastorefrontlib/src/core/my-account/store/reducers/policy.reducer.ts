import * as fromAction from '../actions';

export interface PolicyState {
  data: {};
  loaded: boolean;
}

export const initialState: PolicyState = {
  data: {},
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
export const getLoaded = (state: PolicyState) => state.loaded;
