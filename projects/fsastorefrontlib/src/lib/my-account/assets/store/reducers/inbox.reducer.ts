import * as fromAction from '../actions';

export interface MessageState {
  content: any;
  refresh: boolean;
}
export interface InboxState {
  messages: any;
  refresh: boolean;
  loaded: boolean;
  read: boolean;
}
export const initialState: InboxState = {
  messages: {},
  refresh: false,
  loaded: false,
  read: true
};
export function reducer(state = initialState, action: fromAction.MessageAction): InboxState {
  switch (action.type) {
    case fromAction.LOAD_MESSAGES_SUCCESS: {
      const messages = { ...action.payload };
      return {
        ...state,
        messages,
        refresh: true,
        loaded: true
      };
    }
    case fromAction.SET_MESSAGES_STATE_SUCCESS: {
      const payloadObj = { ...action.payload };
      payloadObj.messages.map( message => {
        state.messages.messages.find( obj => {
          if (obj.uid === message.uid) {
            if (message.readDate !== 'undefined') {
              obj.readDate = message.readDate;
            } else {
              obj.readDate = 'undefined';
            }
          }
        });
      });
      const messages = { messages: state.messages.messages };
      return {
        ...state,
        messages,
        refresh: false
      };
    }
  }
  return state;
}

export const getMessages = (state: InboxState) => state.messages;
export const getRefresh = (state: InboxState) => state.refresh;
export const getLoaded = (state: InboxState) => state.loaded;
export const getMessagesAction = (state: InboxState) => state.read;
