import * as fromAction from '../actions';
import { QuoteState } from '../my-account-state';

export const initialState: QuoteState = {
  quotes: {},
  loaded: false,
};

export function reducer(
  state = initialState,
  action: fromAction.QuoteAction
): QuoteState {
  if (action.type === fromAction.LOAD_QUOTES_SUCCESS) {
    const quotes = { ...action.payload };
    return {
      ...state,
      quotes,
      loaded: true,
    };
  }

  return state;
}

export const getQuotes = (state: QuoteState) => state.quotes;
export const getLoaded = (state: QuoteState) => state.loaded;
