import * as fromAction from '../actions';
import { ClaimState } from '../claim-state';

export const initialState: ClaimState = {
  content: {},
  loaded: false,
};

export function reducer(
  state = initialState,
  action: fromAction.UserRequestActions
): ClaimState {
  switch (action.type) {
    case fromAction.UPDATE_USER_REQUEST:
    case fromAction.SUBMIT_USER_REQUEST: {
      return {
        ...state,
        loaded: false,
      };
    }
    case fromAction.UPDATE_USER_REQUEST_SUCCESS:
    case fromAction.SUBMIT_USER_REQUEST_SUCCESS: {
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

export const getClaimContent = (state: ClaimState) => state.content;
