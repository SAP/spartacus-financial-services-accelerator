import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { AuthActions, StateUtils } from '@spartacus/core';
import { InboxState, InboxDataState, INBOX_DATA } from '../inbox-state';
import * as fromInboxReducer from './inbox.reducer';

export function getReducers(): ActionReducerMap<InboxState> {
  return {
    inboxData: StateUtils.loaderReducer<InboxDataState[]>(
      INBOX_DATA,
      fromInboxReducer.reducer
    ),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  InboxState
>> = new InjectionToken<ActionReducerMap<InboxState>>('InboxReducers');
export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
export function clearInboxState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [clearInboxState];
