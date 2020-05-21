import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { CheckoutAdapter } from '../../../core/checkout/connectors/checkout.adapter';
import { OccCheckoutAdapter } from '../checkout/occ-checkout.adapter';
import { defaultOccCheckoutConfig } from './default-occ-checkout-config';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: CheckoutAdapter,
      useClass: OccCheckoutAdapter,
    },
    provideConfig(defaultOccCheckoutConfig),
  ],
})
export class CheckoutOccModule {}
