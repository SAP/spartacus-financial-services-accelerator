import { NgModule } from '@angular/core';
import { FSStorefrontModule } from '@spartacus/fsa-storefront';
import { BaseStorefrontModule } from '@spartacus/storefront';
import { FSConfigurationModule } from './fs-configuration.module';
import { FSFeaturesModule } from './fs-features.module';

@NgModule({
  imports: [
    BaseStorefrontModule,
    FSStorefrontModule,
    FSFeaturesModule,
    FSConfigurationModule,
  ],
  exports: [BaseStorefrontModule],
})
export class FSModule {}
