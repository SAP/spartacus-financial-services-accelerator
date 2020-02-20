import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import * as fromReducer from './change-request.reducer';
import { AuthActions } from '@spartacus/core';

export interface ChangeRequestState {
  changeRequest: fromReducer.ChangeRequestState;
}

export function getReducers(): ActionReducerMap<ChangeRequestState> {
  return {
    changeRequest: fromReducer.reducer,
  };
}
export const reducerToken: InjectionToken<
  ActionReducerMap<ChangeRequestState>
> = new InjectionToken<ActionReducerMap<ChangeRequestState>>(
  'ChangeRequestReducers'
);
export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
export const getChangeRequestState: MemoizedSelector<
  any,
  ChangeRequestState
> = createFeatureSelector<ChangeRequestState>('changeRequests');
export function clearUserState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [clearUserState];
