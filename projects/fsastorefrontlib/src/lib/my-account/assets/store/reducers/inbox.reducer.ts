import * as fromAction from '../actions';

export interface InboxState {
  messages: any;
  refresh: boolean;
  loaded: boolean;
}

export const initialState: InboxState = {
  messages: {},
  refresh: false,
  loaded: false
};

export function reducer(state = initialState, action: fromAction.MessageAction): InboxState {
  switch (action.type) {
    case fromAction.LOAD_MESSAGES_SUCCESS: {
      const messages = { ...action.payload };
      return {
        ...state,
        messages,
        refresh: false,
        loaded: true
      };
    }
  }

  return state;
}

export const getMessages = (state: InboxState) => state.messages;
export const getRefresh = (state: InboxState) => state.refresh;
export const getLoaded = (state: InboxState) => state.loaded;
