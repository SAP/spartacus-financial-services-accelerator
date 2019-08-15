import {ClaimEffects} from './claim.effect';
import { QuoteEffects } from './quote.effect';
import { PolicyEffects } from './policy.effect';
import { InboxEffects } from './inbox.effect';
import { ClaimPoliciesEffects } from './claim-policies.effect';

export const effects: any[] = [QuoteEffects, PolicyEffects, ClaimEffects, ClaimPoliciesEffects, InboxEffects];

export * from './quote.effect';
export * from './policy.effect';
export * from './claim.effect';
export * from './claim-policies.effect';
export * from './inbox.effect';
