import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  QUOTE_NORMALIZER,
  QuoteAdapter,
} from '../../../core/my-account/connectors';
import { OccQuoteAdapter } from './occ-quote.adapter';
import { defaultOccQuoteConfig } from './default-occ-quote-config';
import { OccQuoteNormalizer } from './converters/occ-quote-normalizer';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: QuoteAdapter,
      useClass: OccQuoteAdapter,
    },
    {
      provide: QUOTE_NORMALIZER,
      useExisting: OccQuoteNormalizer,
      multi: true,
    },
    provideConfig(defaultOccQuoteConfig),
  ],
})
export class QuoteOccModule {}
