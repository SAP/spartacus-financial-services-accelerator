import * as fromAction from '../actions';

export interface UserRequestState {
  userRequest: {};
  refresh: boolean;
  loaded: boolean;
}

export const initialState: UserRequestState = {
  userRequest: {},
  refresh: false,
  loaded: false,
};

export function reducer(
  state = initialState,
  action: fromAction.UserRequestAction
): UserRequestState {
  switch (action.type) {
    case fromAction.LOAD_USER_REQUEST_SUCCESS: {
      const userRequest = { ...action.payload };
      console.log('REDUCER');
      console.log(userRequest);
      return {
        ...state,
        userRequest,
        refresh: false,
        loaded: true,
      };
    }
  }
  return state;
}
