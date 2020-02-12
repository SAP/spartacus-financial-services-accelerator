import * as fromReducer from '../reducers/premium-calendar.reducer';
import * as fromAction from '../actions';

describe('Premium Calendar Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as fromAction.PolicyAction;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_PREMIUM_SUCCESS', () => {
    it('should load premium calendar', () => {
      const premiumCalendar = {
        policyId: 'policyId',
        contractId: 'contractId',
      };

      const { initialState } = fromReducer;
      const action = new fromAction.LoadPremiumCalendarSuccess(premiumCalendar);
      const state = fromReducer.reducer(initialState, action);
      expect(state.data).toEqual(premiumCalendar);
      expect(state.loaded).toEqual(true);
    });
  });
});
