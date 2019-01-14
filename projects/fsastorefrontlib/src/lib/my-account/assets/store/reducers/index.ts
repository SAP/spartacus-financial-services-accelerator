import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';

import * as fromQuoteReducer from './quote.reducer';
import * as fromPolicyReducer from './policy.reducer';
import * as fromClaimReducer from './claim.reducer';


export interface UserState {
  quotes: fromQuoteReducer.QuoteState;
  policies: fromPolicyReducer.PolicyState;
  claims: fromClaimReducer.ClaimState;
}

export function getReducers(): ActionReducerMap<UserState> {
  return {
    quotes: fromQuoteReducer.reducer,
    policies: fromPolicyReducer.reducer,
    claims: fromClaimReducer.reducer
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<UserState>
> = new InjectionToken<ActionReducerMap<UserState>>('UserReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};

export const getUserState: MemoizedSelector<
  any,
  UserState
> = createFeatureSelector<UserState>('assets');
