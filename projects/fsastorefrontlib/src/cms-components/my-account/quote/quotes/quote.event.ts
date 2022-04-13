import { ProfileTagPushEvent } from '@spartacus/cds';
import { CxEvent } from '@spartacus/core';

/**
 * An abstract event for all the quote events.
 */
export abstract class QuoteEvent extends CxEvent {
  userId?: string;
  activeCartId?: string;
}

/**
 * Indicates that a user has successfully placed an quote.
 */
export class QuotePlacedEvent extends QuoteEvent {
  /**
   * Event's type
   */
  static readonly type = 'QuotePlacedEvent';
  /**
   * Quote
   */
  quote: any;
}

export class QuoteConfirmationPushEvent implements ProfileTagPushEvent {
  name = 'QuoteConfirmationPushEvent';
  data: any;
  constructor(data?: any) {
    console.log(data, 'data QuoteConfirmationPushEvent');
    this.data = data;
  }
}
