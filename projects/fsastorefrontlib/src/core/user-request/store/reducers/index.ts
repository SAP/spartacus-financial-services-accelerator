import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector,
  MetaReducer,
  ActionReducer,
} from '@ngrx/store';
import * as fromUserRequestReducer from './user-request.reducer';
import { UserRequestState } from '../user-request-state';
import { AuthActions } from '@spartacus/core';

export interface FSUserRequestState {
  userRequest: UserRequestState;
}

export function getReducers(): ActionReducerMap<FSUserRequestState> {
  return {
    userRequest: fromUserRequestReducer.reducer,
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<FSUserRequestState>
> = new InjectionToken<ActionReducerMap<FSUserRequestState>>(
  'FSUserRequestReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export const getUserRequestState: MemoizedSelector<
  any,
  FSUserRequestState
> = createFeatureSelector<FSUserRequestState>('userRequest');

export function clearUserRequestState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearUserRequestState];
