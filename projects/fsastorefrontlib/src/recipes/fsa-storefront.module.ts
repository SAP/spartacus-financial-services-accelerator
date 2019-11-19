import { NgModule, ModuleWithProviders } from '@angular/core';
import { provideConfig, ConfigModule } from '@spartacus/core';
import {
  StorefrontConfig,
  B2cStorefrontModule,
  PageComponentModule,
  defaultCmsContentConfig,
} from '@spartacus/storefront';
import { translations, translationChunksConfig } from '@spartacus/assets';

import { CmsLibModule } from '../cms-components/cms-lib.module';
import { fstranslations } from '../assets/translations/index';
import { fsaLayoutConfig } from './config/default-fsa-layout-config';
import { fsaRoutingConfig } from '../cms-structure/routing/default-fsa-routing-config';
import { CheckoutModule } from '../cms-components/checkout/checkout.module';
import { fsaCheckoutConfig } from '../cms-components/checkout/config/default-fsa-checkout-config';
import { fsaOccProductConfig } from '../occ/services/default-occ-fsa-product-config';

@NgModule({
  imports: [
    PageComponentModule,
    B2cStorefrontModule,
    CheckoutModule,
    CmsLibModule,
    CheckoutModule,
    ConfigModule.forRoot(),
    ConfigModule.withConfig({
      i18n: {
        resources: {
          en: translations.en,
        },
        chunks: translationChunksConfig,
      },
    }),
    ConfigModule.withConfig({
      i18n: {
        resources: {
          en: fstranslations.en,
        },
      },
    }),
    ConfigModule.withConfig(fsaLayoutConfig),
    ConfigModule.withConfigFactory(defaultCmsContentConfig),
    ConfigModule.withConfig(fsaRoutingConfig),
    ConfigModule.withConfig(fsaCheckoutConfig),
    ConfigModule.withConfig(fsaOccProductConfig),
  ],
  exports: [B2cStorefrontModule, CmsLibModule],
  declarations: [],
})
export class FSAStorefrontModule {
  static withConfig(config?: StorefrontConfig): ModuleWithProviders {
    return {
      ngModule: FSAStorefrontModule,
      providers: [provideConfig(config)],
    };
  }
}
