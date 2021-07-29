import * as fromAction from '../actions';
import { QuoteState } from '../my-account-state';

export const initialState: QuoteState = {
  quotes: [],
  quoteDetails: null,
  loaded: false,
};

export function reducer(
  state = initialState,
  action: fromAction.QuoteAction
): QuoteState {
  switch (action.type) {
    case fromAction.LOAD_QUOTES_SUCCESS: {
      const quotes = action.payload ? [...action.payload] : [];
      return {
        ...state,
        quotes,
        loaded: true,
      };
    }
    case fromAction.LOAD_QUOTE_DETAILS_SUCCESS: {
      const quoteDetails = action.payload ? { ...action.payload } : null;
      return {
        ...state,
        quoteDetails,
        loaded: true,
      };
    }
  }
  return state;
}

export const getQuotes = (state: QuoteState) => state.quotes;
export const getQuote = (state: QuoteState) => state.quoteDetails;
export const getLoaded = (state: QuoteState) => state.loaded;
