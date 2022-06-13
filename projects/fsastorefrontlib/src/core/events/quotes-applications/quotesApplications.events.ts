import { CxEvent } from '@spartacus/core';
import { InsuranceQuote } from '@spartacus/fsa-storefront';

/**
 * An abstract event for all the quote events.
 */
export abstract class QuoteEvent extends CxEvent {
  userId?: string;
  activeCartId?: string;
  quote?: InsuranceQuote;
}

/**
 * Indicates that a user has successfully placed an quote.
 */
export class QuoteUpdatedEvent extends QuoteEvent {
  /**
   * Event's type
   */
  static readonly type = 'QuoteUpdatedEvent';
}
