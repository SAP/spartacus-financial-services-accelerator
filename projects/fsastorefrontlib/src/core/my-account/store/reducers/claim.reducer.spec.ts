import * as fromReducer from '../reducers/claim.reducer';
import * as fromAction from '../actions';

const mockedClaim = {
  claimNumber: '0000001',
};

const { initialState } = fromReducer;

describe('Claim Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as fromAction.ClaimAction;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_CLAIMS_SUCCESS', () => {
    it('should load claims', () => {
      const action = new fromAction.LoadClaimsSuccess(mockedClaim);
      const state = fromReducer.reducer(initialState, action);
      expect(state.claims).toEqual(mockedClaim);
      expect(state.loaded).toEqual(true);
    });
  });

  describe('LOAD_CURRENT_CLAIM_SUCCESS', () => {
    it('should load current claim', () => {
      const action = new fromAction.LoadClaimByIdSuccess(mockedClaim);
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(mockedClaim);
      expect(state.loaded).toEqual(true);
    });
  });

  describe('DELETE_CLAIM_SUCESS', () => {
    it('should delete claim and check refresh state', () => {
      const action = new fromAction.DeleteClaimSuccess();
      const state = fromReducer.reducer(initialState, action);
      expect(state.refresh).toEqual(true);
    });
  });

  describe('DELETE_CLAIM', () => {
    it('should delete claim and check loaded state', () => {
      const action = new fromAction.DeleteClaim(mockedClaim);
      const state = fromReducer.reducer(initialState, action);
      expect(state.loaded).toEqual(false);
    });
  });

  describe('CREATE_CLAIM_SUCCESS', () => {
    it('should create claim', () => {
      const action = new fromAction.CreateClaimSuccess(mockedClaim);
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(mockedClaim);
      expect(state.refresh).toEqual(false);
    });

    describe('UPDATE_CLAIM_SUCCESS', () => {
      it('should update claim', () => {
        const action = new fromAction.UpdateClaimSuccess(mockedClaim);
        const state = fromReducer.reducer(initialState, action);
        expect(state.content).toEqual(mockedClaim);
        expect(state.refresh).toEqual(false);
      });
    });
  });
});
