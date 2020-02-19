import * as fromReducer from '../reducers/change-request.reducer';
import * as fromAction from '../actions';

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

  describe('CREATE_CHANGE_REQUEST_SUCESS', () => {
    it('should create change request', () => {
      const action = new fromAction.CreateChangeRequestSuccess(
        mockedChangeRequest
      );
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(mockedChangeRequest);
      expect(state.loaded).toEqual(true);
    });
  });
});
