import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './feature.selector';
import * as fromQuote from '../reducers/quote.reducer';
import {
  MyAccountState,
  QuoteState,
  StateWithMyAccount,
} from '../my-account-state';

export const getQuotesState: MemoizedSelector<
  StateWithMyAccount,
  QuoteState
> = createSelector(
  fromFeature.getUserState,
  (quoteState: MyAccountState) => quoteState.quotes
);

export const getQuotes: MemoizedSelector<
  StateWithMyAccount,
  any
> = createSelector(getQuotesState, fromQuote.getQuotes);

export const getQuotesLoaded: MemoizedSelector<
  StateWithMyAccount,
  boolean
> = createSelector(getQuotesState, fromQuote.getLoaded);
