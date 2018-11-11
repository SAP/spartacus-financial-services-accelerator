import * as fromAction from './../actions';

export interface ClaimState {
  refresh: boolean;
  loaded: boolean;
  claims: { [claimNumber: string]: any };
}

export const initialState: ClaimState = {
  claims: {},
  refresh: false,
  loaded: false
};

export function reducer(
  state = initialState,
  action: fromAction.ClaimAction
): ClaimState {
  switch (action.type) {
    case fromAction.LOAD_CLAIMS_SUCCESS: {
      const claims = { ...action.payload };
      return {
        ...state,
        claims,
        refresh: false,
        loaded: true
      };
    }

    case fromAction.DELETE_CLAIM_SUCCESS: {
      return {
        ...state,
        refresh: true
      };
    }

    case fromAction.DELETE_CLAIM:
      return {
        ...state,
        loaded: false
      };
  }

  return state;
}

export const getClaims = (state: ClaimState) => state.claims;
export const getRefresh = (state: ClaimState) => state.refresh;
export const getLoaded = (state: ClaimState) => state.loaded;
