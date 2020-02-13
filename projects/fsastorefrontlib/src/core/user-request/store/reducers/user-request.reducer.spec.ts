import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import * as fromReducer from '../reducers/user-request.reducer';
import * as fromAction from '../actions';

const { initialState } = fromReducer;

describe('User Request Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as fromAction.UserRequestAction;
      const state = fromReducer.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_USER_REQUEST_SUCCESS', () => {
    it('should load user request', () => {
      const requestId = 'testUserRequest';
      const action = new fromAction.LoadUserRequestSuccess({
        OCC_USER_ID_CURRENT,
        requestId,
      });
      const state = fromReducer.reducer(initialState, action);
      expect(state.content.requestId).toEqual(requestId);
      expect(state.refresh).toEqual(false);
    });
  });
});
