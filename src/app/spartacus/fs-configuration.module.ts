import { NgModule } from '@angular/core';
import { translationChunksConfig, translations } from '@spartacus/assets';
import {
  I18nConfig,
  OccConfig,
  provideConfig,
  provideDefaultConfigFactory,
  SiteContextConfig,
} from '@spartacus/core';
import {
  fsOverrides,
  fsOverridesDe,
  fstranslations,
  fstranslationsDe,
  layoutConfig,
  routingConfig,
  checkoutConfig,
  occProductConfig,
} from '@spartacus/fsa-storefront';
import {
  dynamicformsTranslations,
  dynamicformsTranslationsDe,
} from '@spartacus/dynamicforms';
import { defaultCmsContentProviders, IconConfig } from '@spartacus/storefront';
import { environment } from '../../environments/environment';
import { occUserConfig } from 'projects/fsastorefrontlib/src/occ/services/default-occ-user-config';
import { fsDefaultDateFormatConfigFactory } from 'projects/fsastorefrontlib/src/core/date-config/default-date-config';
import { fsDefaultQuoteComparisonConfigFactory } from 'projects/fsastorefrontlib/src/core/quote-comparison-config/default-quote-comparison-config';

@NgModule({
  providers: [
    ...defaultCmsContentProviders,
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: translations.en,
        },
        chunks: translationChunksConfig,
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: fsOverrides,
          de: fsOverridesDe,
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: fstranslations,
          de: fstranslationsDe,
        },
        fallbackLang: 'en',
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: dynamicformsTranslations,
          de: dynamicformsTranslationsDe,
        },
        fallbackLang: 'en',
      },
    }),
    provideConfig(<IconConfig>{
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
    provideConfig(<OccConfig | SiteContextConfig>{
      backend: {
        occ: {
          prefix: '/occ/v2/',
          baseUrl: environment.occBaseUrl,
        },
      },
      context: {
        baseSite: ['financial'],
        language: ['en', 'de'],
        currency: ['EUR'],
        urlParameters: ['baseSite', 'language', 'currency'],
      },
      authentication: {
        client_id: 'financial_customer',
        client_secret: 'secret',
      },
      features: {
        consignmentTracking: true,
      },
    }),
    provideConfig(layoutConfig),
    provideConfig(routingConfig),
    provideConfig(checkoutConfig),
    provideConfig(occProductConfig),
    provideConfig(occUserConfig),
    provideDefaultConfigFactory(fsDefaultDateFormatConfigFactory),
    provideDefaultConfigFactory(fsDefaultQuoteComparisonConfigFactory),
  ],
})
export class FSConfigurationModule {}
