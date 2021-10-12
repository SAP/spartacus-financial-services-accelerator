import * as fromAction from '../actions';
import { InboxDataState } from '../inbox-state';

export const initialState: InboxDataState[] = [];

export function reducer(
  state = initialState,
  action: fromAction.InboxAction
): InboxDataState[] {
  let content = [...state];
  switch (action.type) {
    case fromAction.LOAD_MESSAGES_SUCCESS: {
      if (content.length > 0) {
        const uniqueMessageGroup =
          content.findIndex(
            (inboxData: InboxDataState) =>
              inboxData.messageGroup === action.payload.messageGroup
          ) === -1;
        const differentPaginationPage =
          content.findIndex(
            (inboxSingleData: InboxDataState) =>
              inboxSingleData.pagination.page !== action.payload.pagination.page
          ) > -1;
        if (uniqueMessageGroup) {
          content = [...content, action.payload];
        }
        if (differentPaginationPage) {
          const paginatedContent = content.filter(
            inboxData => inboxData.messageGroup !== action?.payload.messageGroup
          );
          content = [...paginatedContent, action.payload];
        }
      } else {
        // populates the state on initial load
        content.push(action.payload);
      }
      return action.payload ? content : { ...state };
    }
    case fromAction.LOAD_MESSAGES_FAIL: {
      return initialState;
    }
  }
  return state;
}
