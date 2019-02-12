import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { CartsState, CartState, CART_DATA, loaderReducer } from '@spartacus/core';
import * as fromClaimReducer from './claim.reducer';
import * as fromPolicyReducer from './policy.reducer';
import * as fromPremiumCalendarReducer from './premium-calendar.reducer';
import * as fromQuoteReducer from './quote.reducer';
import * as fromFSCartReducer from './fscart.reducer';


export interface UserState {
  quotes: fromQuoteReducer.QuoteState;
  policies: fromPolicyReducer.PolicyState;
  premiumCalendar: fromPremiumCalendarReducer.PremiumCalendarState;
  claims: fromClaimReducer.ClaimState;
  cart: CartState
}

export function getReducers(): ActionReducerMap<UserState> {
  return {
    quotes: fromQuoteReducer.reducer,
    policies: fromPolicyReducer.reducer,
    premiumCalendar: fromPremiumCalendarReducer.reducer,
    claims: fromClaimReducer.reducer,
    cart: fromFSCartReducer.reducer
  };
}

// export function getFSCartReducers(): ActionReducerMap<CartsState> {
//   return {
//     active: loaderReducer<CartState>(CART_DATA, fromFSCartReducer.reducer)
//   };
// }

// export const reducerFSCartToken: InjectionToken<
//   ActionReducerMap<CartsState>
// > = new InjectionToken<ActionReducerMap<CartsState>>('FSCartReducers');

// export const reducerFSCartProvider: Provider = {
//   provide: reducerFSCartToken,
//   useFactory: getFSCartReducers
// };

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

 