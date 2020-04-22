import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { QuoteAdapter } from '../../../core/my-account/connectors';
import { OccQuoteAdapter } from './occ-quote.adapter';
import { defaultOccQuoteConfig } from './default-occ-quote-config';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: QuoteAdapter,
      useClass: OccQuoteAdapter,
    },
    provideConfig(defaultOccQuoteConfig),
  ],
})
export class QuoteOccModule {}
