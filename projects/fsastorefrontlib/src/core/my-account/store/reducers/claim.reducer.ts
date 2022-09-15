import * as fromAction from '../actions';
import { ClaimState } from '../my-account-state';

export const initialState: ClaimState = {
  claims: {},
  refresh: false,
  loaded: false,
  content: null,
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
        loaded: true,
      };
    }

    case fromAction.LOAD_CLAIM_BY_ID_SUCCESS: {
      const content = action.payload ? { ...action.payload } : null;
      return {
        ...state,
        content,
        loaded: true,
      };
    }

    case fromAction.DELETE_CLAIM_SUCCESS: {
      return {
        ...state,
        refresh: true,
      };
    }

    case fromAction.CREATE_CLAIM:
    case fromAction.DELETE_CLAIM:
      return {
        ...state,
        loaded: false,
      };

    case fromAction.CREATE_CLAIM_SUCCESS:
    case fromAction.UPDATE_CLAIM_SUCCESS: {
      const content = { ...action.payload };
      return {
        ...state,
        content,
        refresh: false,
        loaded: true,
      };
    }
    case fromAction.RESET_CLAIM_STATE: {
      state = initialState;
    }
  }

  return state;
}

export const getClaims = (state: ClaimState) => state.claims;
export const getRefresh = (state: ClaimState) => state.refresh;
export const getLoaded = (state: ClaimState) => state.loaded;
export const getContent = (state: ClaimState) => state.content;
