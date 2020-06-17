import * as fromAction from '../actions';
import * as fromReducer from '../reducers/change-request.reducer';

const mockedChangeRequest = {
  requestId: '0000001',
};

const { initialState } = fromReducer;

describe('Change Request Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as fromAction.ChangeRequestAction;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_CHANGE_REQUEST_SUCCESS', () => {
    it('should load change request', () => {
      const action = new fromAction.LoadChangeRequestSuccess(
        mockedChangeRequest
      );
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(mockedChangeRequest);
      expect(state.loaded).toEqual(true);
    });
  });

  describe('CREATE_CHANGE_REQUEST_SUCCESS', () => {
    it('should create change request', () => {
      const action = new fromAction.CreateChangeRequestSuccess(
        mockedChangeRequest
      );
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(mockedChangeRequest);
      expect(state.loaded).toEqual(true);
    });
  });

  describe('SIMULATE_CHANGE_REQUEST_SUCCESS', () => {
    it('should simulate change request', () => {
      const action = new fromAction.SimulateChangeRequestSuccess(
        mockedChangeRequest
      );
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(mockedChangeRequest);
      expect(state.loaded).toEqual(true);
    });
  });

  describe('CANCEL_CHANGE_REQUEST_SUCCESS', () => {
    it('should cancel change request', () => {
      const action = new fromAction.CancelChangeRequestSuccess(
        mockedChangeRequest
      );
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(mockedChangeRequest);
    });
  });
});
