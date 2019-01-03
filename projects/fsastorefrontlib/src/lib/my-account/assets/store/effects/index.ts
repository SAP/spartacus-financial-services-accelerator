import {ClaimEffects} from './claim.effect';
import { QuoteEffects } from './quote.effect';
import { PolicyEffects } from './policy.effect';
import { PolicyDetailsEffects } from './policy-details.effect';
import { PremiumCalendarEffects } from './premium-calendar.effect';

export const effects: any[] = [QuoteEffects, PolicyEffects, ClaimEffects, PolicyDetailsEffects, PremiumCalendarEffects];

export * from './quote.effect';
export * from './policy.effect';
export * from './claim.effect';
export * from './policy-details.effect';
export * from './premium-calendar.effect';
