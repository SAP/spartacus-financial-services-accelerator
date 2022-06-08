import { ProfileTagPushEvent } from '@spartacus/cds';
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
export class QuotePlacedEvent extends QuoteEvent {
  /**
   * Event's type
   */
  static readonly type = 'QuotePlacedEvent';
}

export class QuoteConfirmationPushEvent implements ProfileTagPushEvent {
  name = 'QuoteConfirmationPushEvent';
  data: any;
  constructor(data?: any) {
    console.log(data, 'data QuoteConfirmationPushEvent');
    this.data = data;
  }
}
