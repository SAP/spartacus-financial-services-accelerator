import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector,
} from '@ngrx/store';
import * as fromUserRequestReducer from './user-request.reducer';

export interface FSUserRequestState {
  userRequest: fromUserRequestReducer.UserRequestState;
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

export const getUserState: MemoizedSelector<
  any,
  FSUserRequestState
> = createFeatureSelector<FSUserRequestState>('userRequest');

