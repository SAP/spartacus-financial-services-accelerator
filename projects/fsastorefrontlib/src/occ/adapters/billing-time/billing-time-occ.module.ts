import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { defaultOccBillingTimeConfig } from './default-occ-billing-time-config';
import { BillingTimeAdapter } from '../../../core/product-pricing/connectors/billing-time.adapter';
import { OccBillingTimeAdapter } from '../billing-time/occ-billing-time.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: BillingTimeAdapter,
      useClass: OccBillingTimeAdapter,
    },
    provideConfig(defaultOccBillingTimeConfig),
  ],
})
export class BillingTimeOccModule {}
