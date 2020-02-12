import * as fromReducer from '../reducers/quote.reducer';
import * as fromAction from '../actions';

describe('Quotes Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as fromAction.QuoteAction;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_QUOTES_SUCCESS', () => {
    it('should load quotes', () => {
      const mockQuote = {
        quoteId: 'quoteId',
      };

      const { initialState } = fromReducer;
      const action = new fromAction.LoadQuotesSuccess(mockQuote);
      const state = fromReducer.reducer(initialState, action);
      expect(state.quotes).toEqual(mockQuote);
      expect(state.loaded).toEqual(true);
    });
  });
});
