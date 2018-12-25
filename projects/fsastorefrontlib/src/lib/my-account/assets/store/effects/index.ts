import {ClaimEffects} from './claim.effect';
import { QuoteEffects } from './quote.effect';
import { PolicyEffects } from './policy.effect';
import { PolicyDetailsEffects } from './policy-details.effect';

export const effects: any[] = [QuoteEffects, PolicyEffects, ClaimEffects, PolicyDetailsEffects];

export * from './quote.effect';
export * from './policy.effect';
export * from './claim.effect';
export * from './policy-details.effect';

