import * as fromAction from '../actions';

export interface InboxState {
  messages: any;
  refresh: boolean;
  loaded: boolean;
  messageUids: Array<string>;
  read: boolean;
}
export const initialState: InboxState = {
  messages: {},
  refresh: false,
  loaded: false,
  messageUids: [],
  read: true
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
    case fromAction.SET_MESSAGES_STATE_SUCCESS: {
      const messages = { ...action.payload };
      return {
        ...state,
        messages,
        refresh: true
      };
    }
    case fromAction.LOAD_MESSAGE_SUCCESS: {
      const message = { ...action.payload };
      return {
        ...state,
        refresh: true,
        loaded: true
      };
  }
  }
  return state;
}

export const getMessages = (state: InboxState) => state.messages;
export const getRefresh = (state: InboxState) => state.refresh;
export const getLoaded = (state: InboxState) => state.loaded;
export const getMessagesUids = (state: InboxState) => state.messageUids;
export const getMessagesAction = (state: InboxState) => state.read;
