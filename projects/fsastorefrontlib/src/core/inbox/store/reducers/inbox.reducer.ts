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
        let differentPaginationPage;
        content.map(
          (inboxData: InboxDataState) =>
            (differentPaginationPage =
              inboxData.pagination.page !== action.payload.pagination.page
                ? true
                : false)
        );
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
      // console.log(content);
      return action.payload ? content : { ...state };
    }
    case fromAction.LOAD_MESSAGES_FAIL: {
      return initialState;
    }
  }
  return state;
}
