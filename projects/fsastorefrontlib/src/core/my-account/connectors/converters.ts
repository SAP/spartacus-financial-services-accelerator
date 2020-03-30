import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Models } from '../../../model/quote.model';

export const QUOTE_NORMALIZER = new InjectionToken<
  Converter<any, Models.InsuranceQuote>
>('QuoteNormalizer');
