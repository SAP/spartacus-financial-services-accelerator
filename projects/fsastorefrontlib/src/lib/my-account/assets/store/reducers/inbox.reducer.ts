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
      const payloadObj = { ...action.payload };

      const messagesCopy = JSON.parse(JSON.stringify(payloadObj.messages));

      messagesCopy.forEach(element => {
        element.opened = false;
      });

      const messages = { messages: messagesCopy };
      return {
        ...state,
        messages,
        refresh: true,
        loaded: true
      };
    }
    case fromAction.SET_MESSAGES_STATE_SUCCESS: {
      const messagesCopy = JSON.parse(JSON.stringify(state.messages.messages));
      const payloadObj = { ...action.payload };

      payloadObj.messages.map( message => {
        messagesCopy.find( obj => {
          if (obj.uid === message.uid) {
            obj.readDate = message.readDate;
            if (payloadObj.toggleOpen !== undefined) {
              obj.opened = !obj.opened;
            }
          }
        });
      });

      const messages = { messages: messagesCopy};
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
