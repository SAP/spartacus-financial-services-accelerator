import * as fromReducer from '../reducers/quote.reducer';
import * as fromAction from '../actions';

const { initialState } = fromReducer;
const insuranceQuote1: any = {
  cartCode: 'test001',
  defaultCategory: {
    code: 'testCategory1',
  },
  quoteId: 'test001',
};
const insuranceQuote2: any = {
  cartCode: 'test002',
  defaultCategory: {
    code: 'testCategory1',
  },
  quoteId: 'test002',
};
const quoteForComparison = {
  carts: [insuranceQuote1, insuranceQuote2],
};

describe('Quote Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as fromAction.QuoteAction;
      const state = fromReducer.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_QUOTES_SUCCESS', () => {
    it('should load quotes', () => {
      const action = new fromAction.LoadQuotesSuccess([insuranceQuote1]);
      const state = fromReducer.reducer(initialState, action);
      expect(state.quotes).toEqual([insuranceQuote1]);
      expect(state.loaded).toEqual(true);
    });
  });

  describe('LOAD_QUOTE_DETAILS_SUCCESS', () => {
    it('should load quote details', () => {
      const action = new fromAction.LoadQuoteDetailsSuccess(insuranceQuote1);
      const state = fromReducer.reducer(initialState, action);
      expect(state.quoteDetails).toEqual(insuranceQuote1);
      expect(state.loaded).toEqual(true);
    });
  });

  describe('LOAD_QUOTE_COMPARISON_SUCCESS', () => {
    it('should load quote comparison', () => {
      const action = new fromAction.LoadQuoteComparisonSuccess(
        quoteForComparison
      );
      const state = fromReducer.reducer(initialState, action);
      expect(state.quotesComparison).toEqual(quoteForComparison);
      expect(state.loaded).toEqual(true);
    });
  });
});
