import { NgModule } from '@angular/core';
import { translationChunksConfig, translations } from '@spartacus/assets';
import {
  I18nConfig,
  OccConfig,
  provideConfig,
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
import { defaultCmsContentProviders, mediaConfig } from '@spartacus/storefront';
import { environment } from '../../environments/environment';

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
    provideConfig(mediaConfig),
    provideConfig(routingConfig),
    provideConfig(checkoutConfig),
    provideConfig(occProductConfig),
  ],
})
export class FSConfigurationModule {}
