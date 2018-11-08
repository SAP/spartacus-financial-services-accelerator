import * as fromAction from './../actions';

export interface ClaimState {
  refresh: boolean;
  loaded: boolean;
  claims: { [code: string]: any };
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
      let claimEntries = {};
      if (claims.entries) {
        claimEntries = claims.entries.reduce(
          (entryMap: { [code: string]: any }, entry: any) => {
            return {
              ...entryMap,
              [entry.userId]: state.claims[entry.userId]
                ? {
                  ...state.claims[entry.userId],
                  ...entry
                }
                : entry
            };
          },
          {
            ...claimEntries
          }
        );
      }
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

export const getRefresh = (state: ClaimState) => state.refresh;
export const getLoaded = (state: ClaimState) => state.loaded;
