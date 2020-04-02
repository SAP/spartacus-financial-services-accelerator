import { InjectionToken, Provider } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import { ChangeRequestsState } from '../change-request-state';
import * as fromReducer from './change-request.reducer';

export function getReducers(): ActionReducerMap<ChangeRequestsState> {
  return {
    changeRequest: fromReducer.reducer,
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
  return function(state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [clearChangeProcessState];
