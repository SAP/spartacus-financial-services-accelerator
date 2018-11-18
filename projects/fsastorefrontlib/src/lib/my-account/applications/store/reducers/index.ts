import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';
import * as fromQuote from './quote.reducer';
import * as fromPolicy from './policy.reducer';
import * as fromClaim from './claim.reducer';

export interface QuoteState {
  active: fromQuote.QuoteState;
}

export interface PolicyState {
  active: fromPolicy.PolicyState;
}

export interface ClaimState {
  active: fromClaim.ClaimState;
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

export const quoteReducerToken: InjectionToken<
  ActionReducerMap<QuoteState>
> = new InjectionToken<ActionReducerMap<QuoteState>>('QuoteReducers');

export const policyReducerToken: InjectionToken<
  ActionReducerMap<PolicyState>
> = new InjectionToken<ActionReducerMap<PolicyState>>('PolicyReducers');

export const claimReducerToken: InjectionToken<
  ActionReducerMap<ClaimState>
> = new InjectionToken<ActionReducerMap<ClaimState>>('ClaimReducers');

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
