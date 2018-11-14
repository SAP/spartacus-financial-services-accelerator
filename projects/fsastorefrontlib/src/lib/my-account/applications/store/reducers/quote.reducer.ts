import * as fromAction from '../actions';

export interface QuoteState {
  quotes: {};
  refresh: boolean;
  loaded: boolean;
}

export const initialState: QuoteState = {
  quotes: {},
  refresh: false,
  loaded: false
};

export function reducer(
  state = initialState,
  action: fromAction.QuoteAction
): QuoteState {
  switch (action.type) {
    case fromAction.LOAD_QUOTES_SUCCESS: {
      const quotes = { ...action.payload };
      return {
        ...state,
        quotes,
        refresh: false,
        loaded: true
      };
    }
  }

  return state;
}

export const getQuotes = (state: QuoteState) => state.quotes;
export const getRefresh = (state: QuoteState) => state.refresh;
export const getLoaded = (state: QuoteState) => state.loaded;
