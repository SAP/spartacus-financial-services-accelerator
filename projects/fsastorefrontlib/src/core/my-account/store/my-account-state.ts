import { InsuranceQuote } from './../../../../../../dist/fsastorefrontlib/occ/occ-models/occ.models.d';
import { Policy } from './reducers/claim-policies.reducer';

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
  quotes: InsuranceQuote[];
  loaded: boolean;
}

export interface PolicyState {
  data: {};
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
