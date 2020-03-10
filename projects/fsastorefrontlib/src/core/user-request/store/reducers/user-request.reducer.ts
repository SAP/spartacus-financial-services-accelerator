import * as fromAction from '../actions';
import { UserRequestState } from '../user-request-state';

export const initialState: UserRequestState = {
  content: {},
  loaded: false,
};

export function reducer(
  state = initialState,
  action: fromAction.UserRequestActions
): UserRequestState {
  switch (action.type) {
    case fromAction.SUBMIT_USER_REQUEST_SUCCESS: {
      const content = { ...action.payload };
      return {
        ...state,
        content,
        loaded: false,
      };
    }
    case fromAction.LOAD_USER_REQUEST: {
      return {
        ...state,
        loaded: false,
      };
    }
    case fromAction.LOAD_USER_REQUEST_SUCCESS: {
      const content = { ...action.payload };
      return {
        ...state,
        content,
        loaded: true,
      };
    }
  }
  return state;
}
export const getUserRequest = (state: UserRequestState) => state.content;
export const getLoaded = (state: UserRequestState) => state.loaded;
