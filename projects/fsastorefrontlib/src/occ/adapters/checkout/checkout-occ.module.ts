import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { CheckoutAdapter } from '../../../core/checkout/connectors/checkout.adapter';
import { OccCheckoutAdapter } from '../checkout/occ-checkout.adapter';
import { defaultOccInboxConfig } from '../inbox/default-occ-inbox-config';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: CheckoutAdapter,
      useClass: OccCheckoutAdapter,
    },
    provideConfig(defaultOccInboxConfig),
  ],
})
export class CheckoutOccModule {}
