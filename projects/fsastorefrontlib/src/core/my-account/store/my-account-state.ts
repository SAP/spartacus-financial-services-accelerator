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
  consents: ConsentState;
}

export interface Quote {
  quoteId?: string;
}

export interface QuoteState {
  quotes: Models.InsuranceQuote[];
  quoteDetails: {};
  quotesComparison: {};
  loaded: boolean;
}

export interface ConsentState {
  consents: {};
  customer: {};
  customerQuotes: Models.InsuranceQuote[];
  customerPolicies: {};
  customerClaims: {};
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
