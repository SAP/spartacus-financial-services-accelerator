import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './feature.selector';
import * as fromQuote from '../reducers/quote.reducer';
import {
  MyAccountState,
  QuoteState,
  StateWithMyAccount,
} from '../my-account-state';

/**
 * @deprecated since version 4.0.2
 * Use connector directly, as we remove store for this feature.
 */
export const getQuotesState: MemoizedSelector<
  StateWithMyAccount,
  QuoteState
> = createSelector(
  fromFeature.getUserState,
  (quoteState: MyAccountState) => quoteState.quotes
);

/**
 * @deprecated since version 4.0.2
 * Use connector directly, as we remove store for this feature.
 */
export const getQuotes: MemoizedSelector<
  StateWithMyAccount,
  any
> = createSelector(getQuotesState, fromQuote.getQuotes);

export const getQuoteDetails: MemoizedSelector<
  StateWithMyAccount,
  any
> = createSelector(getQuotesState, fromQuote.getQuote);

export const getQuotesComparison: MemoizedSelector<
  StateWithMyAccount,
  any
> = createSelector(getQuotesState, fromQuote.getQuotesComparison);

/**
 * @deprecated since version 4.0.2
 * Use connector directly, as we remove store for this feature.
 */
export const getQuotesLoaded: MemoizedSelector<
  StateWithMyAccount,
  boolean
> = createSelector(getQuotesState, fromQuote.getLoaded);
