import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import * as fromClaimPoliciesReducer from './claim-policies.reducer';
import * as fromClaimReducer from './claim.reducer';
import * as fromPolicyReducer from './policy.reducer';
import * as fromPremiumCalendarReducer from './premium-calendar.reducer';
import * as fromQuoteReducer from './quote.reducer';
import * as fromConsentReducer from './consent.reducer';
import { AuthActions } from '@spartacus/core';
import { MyAccountState } from '../my-account-state';
import * as fromClaimAction from './../actions/claim.action';

export function getReducers(): ActionReducerMap<MyAccountState> {
  return {
    quotes: fromQuoteReducer.reducer,
    policies: fromPolicyReducer.reducer,
    premiumCalendar: fromPremiumCalendarReducer.reducer,
    claims: fromClaimReducer.reducer,
    claimPolicies: fromClaimPoliciesReducer.reducer,
    consents: fromConsentReducer.reducer,
  };
}
export const reducerToken: InjectionToken<ActionReducerMap<
  MyAccountState
>> = new InjectionToken<ActionReducerMap<MyAccountState>>('UserReducers');
export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearUserState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    if (
      action.type === AuthActions.LOGOUT ||
      action.type === fromClaimAction.DELETE_CLAIM_SUCCESS
    ) {
      localStorage.removeItem('spartacus⚿⚿claims');
      state = undefined;
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [clearUserState];
