import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule, SpinnerModule } from '@spartacus/storefront';
import {
  PaymentFormModule,
  PaymentMethodModule,
} from '@spartacus/checkout/components';
import {
  ConfigModule,
  I18nConfig,
  I18nModule,
  provideConfig,
} from '@spartacus/core';
import { FSDigitalPaymentMethodComponent } from './../digital-payment-method/digital-payment-method.component';
import {
  DigitalPaymentsModule,
  dpTranslationChunksConfig,
  dpTranslations,
} from '@spartacus/digital-payments';

// const featureModules = [];

// if (environment?.digitalPayments) {
//   featureModules.push(DigitalPaymentsModule);
// }

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    SpinnerModule,
    I18nModule,
    PaymentMethodModule,
    PaymentFormModule,
    DigitalPaymentsModule,
    ConfigModule.withConfig({
      cmsComponents: {
        CheckoutPaymentDetails: {
          component: FSDigitalPaymentMethodComponent,
        },
      },
    }),
  ],
  providers: [
    provideConfig(<I18nConfig>{
      i18n: {
        resources: dpTranslations,
        chunks: dpTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
  declarations: [FSDigitalPaymentMethodComponent],
  exports: [FSDigitalPaymentMethodComponent],
})
export class FSDpPaymentMethodModule {}
