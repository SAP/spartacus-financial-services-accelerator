import { CxEvent } from '@spartacus/core';
import { PricingData } from './../../../occ/occ-models/form-pricing.interface';
import { InsuranceQuote } from '../../../occ/occ-models/occ.models';

/**
 * An abstract event for all the quote events.
 */
export abstract class QuoteApplicationEvent extends CxEvent {
  userId?: string;
  activeCartId?: string;
  quote?: InsuranceQuote;
}

/**
 * Indicates that a user has successfully placed an quote.
 */
export class QuoteApplicationUpdatedEvent extends QuoteApplicationEvent {
  /**
   * Event's type
   */
  productCode?: string;
  bundleTemplateId?: string;
  quantity?: number;
  pricingData?: PricingData;
  static readonly type = 'QuoteApplicationUpdatedEvent';
}
