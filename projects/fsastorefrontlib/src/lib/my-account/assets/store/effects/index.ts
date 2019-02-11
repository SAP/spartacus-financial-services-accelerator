import {ClaimEffects} from './claim.effect';
import { QuoteEffects } from './quote.effect';
import { PolicyEffects } from './policy.effect';
import {FSCartEffects} from './fscart.effect';
export const effects: any[] = [QuoteEffects, PolicyEffects, ClaimEffects,FSCartEffects];

export * from './quote.effect';
export * from './policy.effect';
export * from './claim.effect';
export * from './fscart.effect';
