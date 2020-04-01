import * as fromReducer from '../reducers/quote.reducer';
import * as fromAction from '../actions';

const { initialState } = fromReducer;

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
      const mockQuotes = [
        {
          quoteId: 'quoteId',
        },
      ];

      const action = new fromAction.LoadQuotesSuccess(mockQuotes);
      const state = fromReducer.reducer(initialState, action);
      expect(state.quotes).toEqual(mockQuotes);
      expect(state.loaded).toEqual(true);
    });
  });
});
