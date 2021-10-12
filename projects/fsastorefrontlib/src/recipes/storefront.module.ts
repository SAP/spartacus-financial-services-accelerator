import { ModuleWithProviders, NgModule } from '@angular/core';
import { translationChunksConfig, translations } from '@spartacus/assets';
import {
  Config,
  ConfigModule,
  I18nConfig,
  OccConfig,
  provideConfig,
  provideDefaultConfigFactory,
  RoutingConfig,
} from '@spartacus/core';
import {
  BaseStorefrontModule,
  IconConfig,
  LayoutConfig,
  PageComponentModule,
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
} from '@spartacus/dynamicforms';
import { fsDefaultDateFormatConfigFactory } from '../core/date-config/default-date-config';
import { defaultCmsContentProviders } from './config/messages-cms-structure';
import { FSGlobalMessageModule } from '../core/global-message/global-message.module';
import { fsDefaultQuoteComparisonConfigFactory } from '../core/quote-comparison-config/default-quote-comparison-config';
import { FSCheckoutConfig } from 'fsastorefrontlib/cms-components';
import { FSOccConfig } from 'fsastorefrontlib/occ';

@NgModule({
  imports: [
    BaseStorefrontModule,
    PageComponentModule,
    CmsLibModule,
    CheckoutModule,
    OccModule,
    FSGlobalMessageModule.forRoot(),
  ],
  exports: [BaseStorefrontModule, CmsLibModule],
  declarations: [],
  // providers: [
  //   provideConfig(<I18nConfig>{
  //     i18n: {
  //       resources: {
  //         en: translations.en,
  //       },
  //       chunks: translationChunksConfig,
  //     },
  //   }),
  //   provideConfig(<I18nConfig>{
  //     i18n: {
  //       resources: {
  //         en: fsOverrides,
  //         de: fsOverridesDe,
  //       },
  //     },
  //   }),
  //   provideConfig(<I18nConfig>{
  //     i18n: {
  //       resources: {
  //         en: fstranslations,
  //         de: fstranslationsDe,
  //       },
  //       fallbackLang: 'en',
  //     },
  //   }),
  //   provideConfig(<I18nConfig>{
  //     i18n: {
  //       resources: {
  //         en: dynamicformsTranslations,
  //         de: dynamicformsTranslationsDe,
  //       },
  //       fallbackLang: 'en',
  //     },
  //   }),
  //   provideConfig(layoutConfig),
  //   provideConfig(routingConfig),
  //   provideConfig(checkoutConfig),
  //   provideConfig(occProductConfig),
  //   provideConfig(occUserConfig),
  //   provideConfig(<IconConfig>{
  //     icon: {
  //       symbols: {
  //         PROPERTY: 'fs-icon icon-house',
  //         AUTO: 'fs-icon icon-auto',
  //         PERSON: 'fs-icon icon-heart',
  //         TRIP: 'fs-icon icon-plane',
  //         EVENT: 'fs-icon icon-event',
  //       },
  //     },
  //   }),
  // ],
})
export class FSStorefrontModule {
  // static withConfig(config?: Config): ModuleWithProviders<FSStorefrontModule> {
  //   return {
  //     ngModule: FSStorefrontModule,
  //     providers: [
  //       provideConfig(config),
  //       provideDefaultConfigFactory(fsDefaultDateFormatConfigFactory),
  //       ...defaultCmsContentProviders,
  //     ],
  //   };
  // }
}
