import * as fromAction from '../actions';
import { QuoteState } from '../my-account-state';

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const initialState: QuoteState = {
  quotes: [],
  quoteDetails: null,
  quotesComparison: null,
  loaded: false,
};

/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export function reducer(
  state = initialState,
  action: fromAction.QuoteAction
): QuoteState {
  switch (action.type) {
    case fromAction.LOAD_QUOTES:
    case fromAction.LOAD_QUOTE_COMPARISON:
    case fromAction.LOAD_QUOTE_DETAILS: {
      return {
        ...initialState,
      };
    }
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
    case fromAction.LOAD_QUOTE_COMPARISON_SUCCESS: {
      const quotesComparison = action.payload ? { ...action.payload } : null;
      return {
        ...state,
        quotesComparison,
        loaded: true,
      };
    }
  }
  return state;
}
/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const getQuotes = (state: QuoteState) => state.quotes;
/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const getQuote = (state: QuoteState) => state.quoteDetails;
/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const getQuotesComparison = (state: QuoteState) =>
  state.quotesComparison;
/**
 * @deprecated since version 4.0.2
 * Use Commands and Queries instead.
 */
export const getLoaded = (state: QuoteState) => state.loaded;
