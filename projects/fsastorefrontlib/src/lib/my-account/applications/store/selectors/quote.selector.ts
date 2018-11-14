import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';
import * as fromQuote from './../reducers/quote.reducer';

export const getActiveQuoteState: MemoizedSelector<
  any,
  fromQuote.QuoteState
> = createSelector(
  fromFeature.getQuoteState,
  (claimState: fromFeature.QuoteState) => claimState.active
);

export const getActiveQuotes: MemoizedSelector<any, any> = createSelector(
  getActiveQuoteState,
  fromQuote.getQuotes
);

export const getQuoteRefresh: MemoizedSelector<any, boolean> = createSelector(
  getActiveQuoteState,
  fromQuote.getRefresh
);

export const getQuoteLoaded: MemoizedSelector<any, boolean> = createSelector(
  getActiveQuoteState,
  fromQuote.getLoaded
);

export const getQuotesMap: MemoizedSelector<any, any> = createSelector(
  getActiveQuoteState,
  fromQuote.getQuotes
);

export const getQuoteEntrySelectorFactory = (
  quoteId
): MemoizedSelector<any, any> => {
  return createSelector(getQuotesMap, quotes => {
    if (quotes) {
      return quotes[quoteId];
    }
  });
};

export const getQuotes: MemoizedSelector<any, any> = createSelector(
  getQuotesMap,
  quotes => {
    return Object.keys(quotes).map(quoteId => quotes[quoteId]);
  }
);
