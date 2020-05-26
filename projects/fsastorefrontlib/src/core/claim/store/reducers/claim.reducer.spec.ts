import * as fromReducer from './claim.reducer';
import * as fromAction from '../actions';

const { initialState } = fromReducer;
const requestId = 'testUserRequest';
const mockedUserRequest = {
  requestId: requestId,
};
describe('Claim Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as fromAction.UserRequestActions;
      const state = fromReducer.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('SUBMIT_USER_REQUEST', () => {
    it('should submit user request', () => {
      const action = new fromAction.SubmitUserRequestSuccess(mockedUserRequest);
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(mockedUserRequest);
    });
  });
  describe('UPDATE_USER_REQUEST', () => {
    it('should update user request', () => {
      const action = new fromAction.UpdateUserRequestSuccess(mockedUserRequest);
      const state = fromReducer.reducer(initialState, action);
      expect(state.content).toEqual(mockedUserRequest);
    });
  });
});
