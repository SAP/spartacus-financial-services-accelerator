import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';

import * as fromQuoteReducer from './quote.reducer';
import * as fromPolicyReducer from './policy.reducer';
import * as fromPremiumCalendarReducer from './premium-calendar.reducer';
import * as fromClaimReducer from './claim.reducer';
import * as fromFSCartReducer from './fscart.reducer';
import { ActionReducer } from '@ngrx/store/src/models';
import { FSCartAction } from 'projects/fsastorefrontlib/src/lib/my-account/assets/store';

export interface UserState {
  quotes: fromQuoteReducer.QuoteState;
  policies: fromPolicyReducer.PolicyState;
  premiumCalendar: fromPremiumCalendarReducer.PremiumCalendarState;
  claims: fromClaimReducer.ClaimState;
}

export interface CartState {
  carts: fromFSCartReducer.CartState
}

export function getReducers(): ActionReducerMap<UserState> {
  return {
    quotes: fromQuoteReducer.reducer,
    policies: fromPolicyReducer.reducer,
    premiumCalendar: fromPremiumCalendarReducer.reducer,
    claims: fromClaimReducer.reducer,
  };
}

export function getCartReducer(): ActionReducerMap<CartState> {
  return {
    carts: fromFSCartReducer.reducer
  }
}

export const reducerCartToken: InjectionToken<
  ActionReducerMap<CartState>
  > = new InjectionToken<ActionReducerMap<CartState>>('CartReducers');

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

  export const reducerCartProvider: Provider = {
    provide: reducerCartToken,
    useFactory: getCartReducer
  };

  export const getCartState: MemoizedSelector<
  any,
  CartState
  > = createFeatureSelector<CartState>('carts');