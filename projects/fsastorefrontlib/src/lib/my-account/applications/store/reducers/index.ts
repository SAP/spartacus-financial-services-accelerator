import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';
import * as fromQuote from './quote.reducer';
import * as fromPolicy from './policy.reducer';
import * as fromClaim from './claim.reducer';
import * as fromPolicyDetails from './policy-details.reducer';


export interface QuoteState {
  active: fromQuote.QuoteState;
}

export interface PolicyState {
  active: fromPolicy.PolicyState;
}

export interface ClaimState {
  active: fromClaim.ClaimState;
}

export interface PolicyDetailsState {
  policy: fromPolicyDetails.PolicyDetailsState;
}

export function getQuoteReducers(): ActionReducerMap<QuoteState> {
  return {
    active: fromQuote.reducer
  };
}

export function getPolicyReducers(): ActionReducerMap<PolicyState> {
  return {
    active: fromPolicy.reducer
  };
}

export function getClaimReducers(): ActionReducerMap<ClaimState> {
  return {
    active: fromClaim.reducer
  };
}

export function getPolicyDetailsReducers(): ActionReducerMap<PolicyDetailsState> {
  return {
    policy: fromPolicyDetails.reducer
  };
}

export const quoteReducerToken: InjectionToken<
  ActionReducerMap<QuoteState>
> = new InjectionToken<ActionReducerMap<QuoteState>>('QuoteReducers');

export const policyReducerToken: InjectionToken<
  ActionReducerMap<PolicyState>
> = new InjectionToken<ActionReducerMap<PolicyState>>('PolicyReducers');

export const claimReducerToken: InjectionToken<
  ActionReducerMap<ClaimState>
> = new InjectionToken<ActionReducerMap<ClaimState>>('ClaimReducers');

export const policyDetailsReducerToken: InjectionToken<
  ActionReducerMap<ClaimState>
> = new InjectionToken<ActionReducerMap<PolicyDetailsState>>('PolicyDetailsReducers');


export const quoteReducerProvider: Provider = {
  provide: quoteReducerToken,
  useFactory: getQuoteReducers
};

export const policyReducerProvider: Provider = {
  provide: policyReducerToken,
  useFactory: getPolicyReducers
};

export const claimReducerProvider: Provider = {
  provide: claimReducerToken,
  useFactory: getClaimReducers
};

export const policyDetailsReducerProvider: Provider = {
  provide: policyDetailsReducerToken,
  useFactory: getPolicyDetailsReducers
};

export const getQuoteState: MemoizedSelector<
  any,
  QuoteState
> = createFeatureSelector<QuoteState>('quote');

export const getPolicyState: MemoizedSelector<
  any,
  PolicyState
> = createFeatureSelector<PolicyState>('policy');

export const getClaimState: MemoizedSelector<
  any,
  ClaimState
> = createFeatureSelector<ClaimState>('claim');

export const getPolicyDetailsState: MemoizedSelector<
  any,
  PolicyDetailsState
> = createFeatureSelector<PolicyDetailsState>('policydetails');