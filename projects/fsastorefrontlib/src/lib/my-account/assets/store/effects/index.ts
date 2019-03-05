import {ClaimEffects} from './claim.effect';
import { QuoteEffects } from './quote.effect';
import { PolicyEffects } from './policy.effect';
import { InboxEffects } from './inbox.effect';
import { FSComponentEffects } from './fs-component.effect';

export const effects: any[] = [QuoteEffects, PolicyEffects, ClaimEffects, InboxEffects, FSComponentEffects];

export * from './quote.effect';
export * from './policy.effect';
export * from './claim.effect';
export * from './inbox.effect';
export * from './fs-component.effect';
