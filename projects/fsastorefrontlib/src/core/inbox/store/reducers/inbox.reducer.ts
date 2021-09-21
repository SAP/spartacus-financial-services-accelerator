import * as fromAction from '../actions';
import { InboxDataState } from '../inbox-state';

export const initialState: InboxDataState[] = [];

export function reducer(
  state = initialState,
  action: fromAction.InboxAction
): InboxDataState[] {
  switch (action.type) {
    case fromAction.LOAD_MESSAGES_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }
    case fromAction.LOAD_MESSAGES_FAIL: {
      return initialState;
    }
  }
  return state;
}

// export const getMessages = (state: InboxDataState) => state.messages;
// export const getmessageGroup = (state: InboxDataState) => state.messageGroup;
// export const getLoaded = (state: InboxDataState) => state.loaded;
