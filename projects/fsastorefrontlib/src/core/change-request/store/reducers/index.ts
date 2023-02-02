import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthActions, StateUtils } from '@spartacus/core';
import * as fromReducer from './change-request.reducer';

import {
  CHANGE_REQUEST_DATA,
  ChangeRequestsState,
  ChangeRequestState,
} from '../change-request-state';

export function getReducers(): ActionReducerMap<ChangeRequestsState> {
  return {
    changeRequest: StateUtils.loaderReducer<ChangeRequestState>(
      CHANGE_REQUEST_DATA,
      fromReducer.reducer
    ),
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<ChangeRequestsState>
> = new InjectionToken<ActionReducerMap<ChangeRequestsState>>(
  'ChangeRequestReducers'
);
export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
export function clearChangeProcessState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [clearChangeProcessState];
