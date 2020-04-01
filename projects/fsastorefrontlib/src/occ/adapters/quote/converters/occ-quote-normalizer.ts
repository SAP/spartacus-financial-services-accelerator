import { Converter } from '@spartacus/core';
import { Injectable } from '@angular/core';
import { Models } from '../../../../../src/model/quote.model';
import { InsuranceQuote } from '../../../../occ';

@Injectable({ providedIn: 'root' })
export class OccQuoteNormalizer
  implements Converter<InsuranceQuote, Models.InsuranceQuote> {
  constructor() {}

  convert(
    source: InsuranceQuote,
    target?: Models.InsuranceQuote
  ): Models.InsuranceQuote {
    if (target === undefined) {
      target = { ...(source as any) };
    }

    return target;
  }
}
