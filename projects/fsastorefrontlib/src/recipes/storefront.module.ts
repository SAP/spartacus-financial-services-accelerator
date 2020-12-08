import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { translationChunksConfig, translations } from '@spartacus/assets';
import { ConfigModule, provideConfig, provideDefaultConfigFactory } from '@spartacus/core';
import {
  B2cStorefrontModule,
  defaultCmsContentConfig,
  PageComponentModule,
  StorefrontConfig,
} from '@spartacus/storefront';
import { fsOverrides, fstranslations } from '../assets/translations/index';
import {
  fsOverridesDe,
  fstranslationsDe,
} from '../assets/translations/index_de';
import { CheckoutModule } from '../cms-components/checkout/checkout.module';
import { checkoutConfig } from '../cms-components/checkout/config/default-checkout-config';
import { CmsLibModule } from '../cms-components/cms-lib.module';
import { routingConfig } from '../cms-structure/routing/default-routing-config';
import { OccModule } from '../occ/occ.module';
import { occProductConfig } from '../occ/services/default-occ-product-config';
import { occUserConfig } from '../occ/services/default-occ-user-config';
import { layoutConfig } from './config/default-layout-config';
import {
  dynamicformsTranslations,
  dynamicformsTranslationsDe,
} from '@fsa/dynamicforms';
import { defaultFSGlobalMessageConfigFactory } from '../core/global-message-config/default-global-message-config';

@NgModule({
  imports: [
    PageComponentModule,
    B2cStorefrontModule,
    CmsLibModule,
    CheckoutModule,
    ConfigModule.forRoot(),
    OccModule,
    StoreModule.forRoot({}),
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
          de: fsOverridesDe,
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
    ConfigModule.withConfig({
      i18n: {
        resources: {
          en: dynamicformsTranslations,
          de: dynamicformsTranslationsDe,
        },
        fallbackLang: 'en',
      },
    }),
    ConfigModule.withConfig(layoutConfig),
    ConfigModule.withConfigFactory(defaultCmsContentConfig),
    ConfigModule.withConfig(routingConfig),
    ConfigModule.withConfig(checkoutConfig),
    ConfigModule.withConfig(occProductConfig),
    ConfigModule.withConfig(occUserConfig),
    ConfigModule.withConfig({
      icon: {
        symbols: {
          PROPERTY: 'fs-icon icon-house',
          AUTO: 'fs-icon icon-auto',
          PERSON: 'fs-icon icon-heart',
          TRIP: 'fs-icon icon-plane',
          EVENT: 'fs-icon icon-event',
        },
      },
    }),
    ConfigModule.withConfig({
      date: {
        format: 'yyyy-mm-dd',
      },
    }),
  ],
  exports: [B2cStorefrontModule, CmsLibModule],
  declarations: [],
})
export class FSStorefrontModule {
  static withConfig(
    config?: StorefrontConfig
  ): ModuleWithProviders<FSStorefrontModule> {
    return {
      ngModule: FSStorefrontModule,
      providers: [provideConfig(config), provideDefaultConfigFactory(defaultFSGlobalMessageConfigFactory)],
    };
  }
}
