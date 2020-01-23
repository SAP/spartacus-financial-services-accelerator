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
import { fstranslationsDe } from '../assets/translations/index_de';
import { fsOverrides } from '../assets/translations/index';

@NgModule({
  imports: [
    PageComponentModule,
    B2cStorefrontModule,
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
          en: fsOverrides,
        },
      },
    }),
    ConfigModule.withConfig({
      i18n: {
        resources: {
          en: fstranslations,
          de: fstranslationsDe,
        },
        fallbackLang: 'en',
      },
    }),
    ConfigModule.withConfig(fsaLayoutConfig),
    ConfigModule.withConfigFactory(defaultCmsContentConfig),
    ConfigModule.withConfig(fsaRoutingConfig),
    ConfigModule.withConfig(fsaCheckoutConfig),
    ConfigModule.withConfig(fsaOccProductConfig),
    ConfigModule.withConfig({
      icon: {
        symbols: {
          PROPERTY: 'FSA-icon icon-FSA-house',
          AUTO: 'FSA-icon icon-FSA-auto',
          PERSON: 'FSA-icon icon-FSA-heart',
          TRIP: 'FSA-icon icon-FSA-plane',
          EVENT: 'FSA-icon icon-FSA-event',
        },
      },
    }),
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
