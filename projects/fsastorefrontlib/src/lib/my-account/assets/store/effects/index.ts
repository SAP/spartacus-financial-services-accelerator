import { ClaimPoliciesEffects } from './claim-policies.effect';
import { ClaimEffects } from './claim.effect';
import { PolicyEffects } from './policy.effect';
import { QuoteEffects } from './quote.effect';

export const effects: any[] = [
  QuoteEffects,
  PolicyEffects,
  ClaimEffects,
  ClaimPoliciesEffects
];

export * from './claim-policies.effect';
export * from './claim.effect';
export * from './policy.effect';
export * from './quote.effect';
