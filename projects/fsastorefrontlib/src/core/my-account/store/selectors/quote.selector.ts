import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromQuote from '../reducers/quote.reducer';

export const getQuotesState: MemoizedSelector<
  any,
  fromQuote.QuoteState
> = createSelector(
  fromFeature.getUserState,
  (quoteState: fromFeature.UserState) => quoteState.quotes
);

export const getQuotes: MemoizedSelector<any, any> = createSelector(
  getQuotesState,
  fromQuote.getQuotes
);

export const getQuotesLoaded: MemoizedSelector<any, boolean> = createSelector(
  getQuotesState,
  fromQuote.getLoaded
);
