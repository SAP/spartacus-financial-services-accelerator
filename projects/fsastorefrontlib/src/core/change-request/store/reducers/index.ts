import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector,
  MetaReducer,
} from '@ngrx/store';
import { AuthActions, LoaderState, loaderReducer } from '@spartacus/core';
import * as fromReducer from './change-request.reducer';
import { CHANGE_REQUEST_DATA } from '../actions';

export interface ChangeRequestState {
  changeRequest: LoaderState<fromReducer.ChangeRequestState>;
}

export function getReducers(): ActionReducerMap<ChangeRequestState> {
  return {
    changeRequest: loaderReducer(CHANGE_REQUEST_DATA),
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
