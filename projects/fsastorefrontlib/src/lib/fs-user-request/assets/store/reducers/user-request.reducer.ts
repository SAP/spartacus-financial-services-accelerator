import * as fromAction from '../actions';
import { UserRequestState } from '../user-request-state';

export const initialState: UserRequestState = {
  content: {},
  refresh: false,
};

export function reducer(
  state = initialState,
  action: fromAction.UserRequestAction
): UserRequestState {
  switch (action.type) {
    case fromAction.LOAD_USER_REQUEST_SUCCESS: {
      const content = { ...action.payload };
      return {
        ...state,
        content,
        refresh: false,
      };
    }
  }
  return state;
}
