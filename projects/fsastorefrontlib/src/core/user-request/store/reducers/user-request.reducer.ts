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
  }
  return state;
}

export const getUserRequestContent = (state: UserRequestState) => state.content;
