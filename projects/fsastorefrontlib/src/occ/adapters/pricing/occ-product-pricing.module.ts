import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { ProductPricingAdapter } from '../../../core/product-pricing/connectors/product-pricing.adapter';
import { OccProductPricingAdapter } from '../pricing/occ-product-pricing.adapter';
import { defaultOccProductPricingConfig } from '../pricing/default-occ-product-pricing-config';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: ProductPricingAdapter,
      useClass: OccProductPricingAdapter,
    },
    provideConfig(defaultOccProductPricingConfig),
  ],
})
export class ProductPricingOccModule {}
