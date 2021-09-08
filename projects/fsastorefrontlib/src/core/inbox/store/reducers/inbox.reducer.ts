import * as fromAction from '../actions';
import { InboxState } from '../inbox-state';

export const initialState: InboxState = {
  messages: {},
  pagination: {},
  sorts: [],
  refresh: false,
  loaded: false,
};

export function reducer(
  state = initialState,
  action: fromAction.InboxAction
): InboxState {
  switch (action.type) {
    case fromAction.LOAD_MESSAGES: {
      const payload = { ...action.payload };
      return {
        ...state,
        messages: payload.messages,
        loaded: true,
      };
    }
  }
  return state;
}

export const getMessages = (state: InboxState) => state.messages;
