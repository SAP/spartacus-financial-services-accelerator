import * as fromAction from '../actions/';
import { ChangeRequestState } from '../change-request-state';

export const initialState: ChangeRequestState = {
  loaded: false,
  content: {},
};

export function reducer(
  state = initialState,
  action: fromAction.ChangeRequestAction
): ChangeRequestState {
  switch (action.type) {
    case fromAction.SUBMIT_CHANGE_REQUEST:
    case fromAction.LOAD_CHANGE_REQUEST:
    case fromAction.SIMULATE_CHANGE_REQUEST:
    case fromAction.CANCEL_CHANGE_REQUEST:
    case fromAction.CREATE_CHANGE_REQUEST: {
      return {
        ...state,
        loaded: false,
      };
    }

    case fromAction.SUBMIT_CHANGE_REQUEST_SUCCESS:
    case fromAction.LOAD_CHANGE_REQUEST_SUCCESS:
    case fromAction.SIMULATE_CHANGE_REQUEST_SUCCESS:
    case fromAction.CANCEL_CHANGE_REQUEST_SUCCESS:
    case fromAction.CREATE_CHANGE_REQUEST_SUCCESS: {
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
export const getChangeRequest = (state: ChangeRequestState) => state.content;
export const getLoaded = (state: ChangeRequestState) => state.loaded;
