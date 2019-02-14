import {ClaimEffects} from './claim.effect';
import { QuoteEffects } from './quote.effect';
import { PolicyEffects } from './policy.effect';
export const effects: any[] = [QuoteEffects, PolicyEffects, ClaimEffects];

export * from './quote.effect';
export * from './policy.effect';
export * from './claim.effect';
