import * as fromAction from '../actions/';

export interface ChangeRequestState {
  loaded: boolean;
  content: {};
}

export const initialState: ChangeRequestState = {
  loaded: false,
  content: {},
};

export function reducer(
  state = initialState,
  action: fromAction.ChangeRequestAction
): ChangeRequestState {
  switch (action.type) {
    case fromAction.CREATE_CHANGE_REQUEST: {
      return {
        ...state,
        loaded: false,
      };
    }
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
