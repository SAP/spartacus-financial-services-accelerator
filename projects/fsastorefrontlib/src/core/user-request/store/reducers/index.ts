import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector,
  MetaReducer,
  ActionReducer,
} from '@ngrx/store';
import * as fromUserRequestReducer from './user-request.reducer';
import {
  FSUserRequestState,
  StateWithUserRequest,
} from '../user-request-state';
import { AuthActions } from '@spartacus/core';
import * as fromClaimAction from '../../../my-account/store/actions';

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
  StateWithUserRequest,
  FSUserRequestState
> = createFeatureSelector<FSUserRequestState>('userRequest');

export function clearUserRequestState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    if (
      action.type === AuthActions.LOGOUT ||
      action.type === fromClaimAction.CREATE_CLAIM ||
      action.type === fromClaimAction.LOAD_CLAIM_BY_ID
    ) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearUserRequestState];
