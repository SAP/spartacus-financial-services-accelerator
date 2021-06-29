import { Policy } from './reducers/claim-policies.reducer';
import { Models } from './../../../model/quote.model';

export const MY_ACCOUNT_FEATURE = 'assets';

export interface StateWithMyAccount {
  [MY_ACCOUNT_FEATURE]: MyAccountState;
}

export interface MyAccountState {
  quotes: QuoteState;
  policies: PolicyState;
  premiumCalendar: PremiumCalendarState;
  claims: ClaimState;
  claimPolicies: ClaimPoliciesState;
}

export interface Quote {
  quoteId?: string;
}

export interface QuoteState {
  quotes: Models.InsuranceQuote[];
  quoteDetails: {};
  loaded: boolean;
}

export interface PolicyState {
  policies: {};
  policyDetails: {};
  loaded: boolean;
}

export interface PremiumCalendarState {
  data: {};
  loaded: boolean;
}

export interface ClaimState {
  claims: {};
  refresh: boolean;
  loaded: boolean;
  content: {};
}

export interface ClaimPoliciesState {
  claimPoliciesData: {
    insurancePolicies: Policy[];
  };
  loaded: boolean;
}
