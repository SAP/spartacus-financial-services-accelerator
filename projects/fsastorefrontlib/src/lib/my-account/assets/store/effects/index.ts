import { ClaimPoliciesEffects } from './claim-policies.effect';
import { ClaimEffects } from './claim.effect';
import { InboxEffects } from './inbox.effect';
import { PolicyEffects } from './policy.effect';
import { QuoteEffects } from './quote.effect';
import { UserRequestEffects } from './user-request.effect';

export const effects: any[] = [QuoteEffects, PolicyEffects, ClaimEffects, ClaimPoliciesEffects, InboxEffects, UserRequestEffects];

export * from './claim-policies.effect';
export * from './claim.effect';
export * from './inbox.effect';
export * from './policy.effect';
export * from './quote.effect';
export * from './user-request.effect';

