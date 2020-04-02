import { Category, Price } from '@spartacus/core';

export namespace Models {
  export interface QuoteStatus {
    title?: string;
  }

  export interface QuoteBindingState {
    code?: string;
  }

  export interface InsuranceQuote {
    quoteId?: string;
    defaultCategory?: Category;
    quoteStatus?: QuoteStatus;
    state?: QuoteBindingState;
    quotePrice?: Price;
    paymentFrequency?: string;
  }
}
