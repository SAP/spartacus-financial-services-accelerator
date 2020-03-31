import * as fromReducer from '../reducers/claim-policies.reducer';
import * as fromAction from '../actions';

const policy: fromReducer.Policy = {
  policy: {
    policyId: '000001',
    contractId: '000001',
  },
};

const policies = {
  insurancePolicies: [policy],
};

const { initialState } = fromReducer;

describe('Claim Policies Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state and not loaded', () => {
      const action = {} as fromAction.ClaimPoliciesAction;
      const state = fromReducer.reducer(undefined, action);
      expect(state).toBe(initialState);
      const loaded = fromReducer.getLoadedClaimPolicies(state);
      expect(loaded).toEqual(false);
    });
  });

  describe('LOAD_CLAIM_POLICIES_SUCCESS', () => {
    it('should load policies for which claim can be created', () => {
      const action = new fromAction.LoadClaimPoliciesSuccess(policies);
      const state = fromReducer.reducer(initialState, action);
      expect(state.claimPoliciesData).toEqual(policies);
      expect(state.loaded).toEqual(true);
    });
  });
});
