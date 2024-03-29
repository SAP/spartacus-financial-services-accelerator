import { NgModule } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
import { DigitalPaymentsModule } from '@spartacus/digital-payments';
import { dpTranslationChunksConfig, dpTranslations } from "@spartacus/digital-payments/assets";

@NgModule({
  imports: [DigitalPaymentsModule],
  providers: [
    provideConfig(<I18nConfig>{
      i18n: {
        resources: dpTranslations,
        chunks: dpTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class DigitalPaymentsFeatureModule { }
