import * as fromReducer from '../reducers/policy.reducer';
import * as fromAction from '../actions';

describe('Quotes Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as fromAction.PolicyAction;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_POLICIES_SUCESS', () => {
    it('should load policies', () => {
      const mockedPolicy = {
        policyId: 'policyId',
        contractId: 'contractId',
      };

      const { initialState } = fromReducer;
      const action = new fromAction.LoadPoliciesSuccess(mockedPolicy);
      const state = fromReducer.reducer(initialState, action);
      expect(state.data).toEqual(mockedPolicy);
      expect(state.loaded).toEqual(true);
    });
  });

  describe('LOAD_POLICY_DETAILS', () => {
    it('should load policy details', () => {
      const mockedPolicy = {
        policyId: 'policyId',
        contractId: 'contractId',
      };

      const { initialState } = fromReducer;
      const action = new fromAction.LoadPoliciesSuccess(mockedPolicy);
      const state = fromReducer.reducer(initialState, action);
      expect(state.data).toEqual(mockedPolicy);
      expect(state.loaded).toEqual(true);
    });

    describe('CLEAR_POLICY_DETAILS', () => {
      it('should clear policy details', () => {
        const { initialState } = fromReducer;
        const action = new fromAction.ClearPolicyDetails();
        const state = fromReducer.reducer(initialState, action);
        expect(state).toBe(initialState);
      });
    });
  });
});
