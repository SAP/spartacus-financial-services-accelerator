import { NgModule, ModuleWithProviders } from '@angular/core';
import { provideConfig, ConfigModule } from '@spartacus/core';
import { StorefrontConfig, B2cStorefrontModule, PageComponentModule } from '@spartacus/storefront';
import { translations, translationChunksConfig } from '@spartacus/assets';

import { MyAccountModule } from './my-account/index';
import { UiModule } from './ui/index';
import { CmsLibModule } from './cms-lib/cms-lib.module';
import { fstranslations } from '../translations';
import { fsaLayoutConfig, fsaCmsContentConfig } from './default-fsa.config';
import { CheckoutModule } from './checkout';
import { FSRegisterModule } from './cms-lib/user/register/fs-register.module';


@NgModule({
  imports: [
    UiModule,
    PageComponentModule,
    CmsLibModule,
    MyAccountModule,
    B2cStorefrontModule,
    FSRegisterModule,
    CheckoutModule,
    ConfigModule.forRoot(),
    ConfigModule.withConfig({
      i18n: {
        resources: {
          en: translations.en
        },
        chunks: translationChunksConfig
      }
    }),
    ConfigModule.withConfig({
      i18n: {
        resources: {
          en: fstranslations.en
        }
      }
    }),
    ConfigModule.withConfig(fsaLayoutConfig),
    ConfigModule.withConfigFactory(fsaCmsContentConfig),
    ConfigModule.withConfig({
      checkout: {
        steps: [
          {
            id: 'comparisonCheckoutStep',
            name: 'fscommon.whatsIncluded',
            routeName: 'category',
            status: {
              disabled: true,
              completed: false,
              active: false
            },
            progressBar: false,
            icon: 'icon-FSA-selected-item',
            type: [],
          },
          {
            id: 'addOptionsStep',
            name: 'fscommon.addOptions',
            routeName: 'addOptions',
            status: {
              disabled: false,
              completed: false,
              active: true
            },
            progressBar: false,
            icon: 'icon-FSA-list',
            type: [],
          },
          {
            id: 'quoteReviewStep',
            name: 'quote.quoteReview',
            routeName: 'quoteReview',
            status: {
              disabled: true,
              completed: false,
              active: false
            },
            progressBar: false,
            icon: 'icon-FSA-shield',
            type: [],
          },
          {
            id: 'checkoutPaymentDetailsStep',
            name: 'fscommon.paymentDetails',
            routeName: 'checkoutPaymentDetails',
            status: {
              disabled: true,
              completed: false,
              active: false
            },
            progressBar: false,
            icon: 'icon-FSA-payment-cards',
            type: [],
          },
          {
            id: 'finalReviewStep',
            name: 'fscommon.finalReview',
            routeName: 'finalReview',
            status: {
              disabled: true,
              completed: false,
              active: false
            },
            progressBar: false,
            icon: 'icon-FSA-review',
            type: [],
          }
        ]
      }
    }),
  ],
  exports: [
    B2cStorefrontModule,
    MyAccountModule,
    CmsLibModule
  ],
  declarations: []
})
export class FSAStorefrontModule {
  static withConfig(config?: StorefrontConfig): ModuleWithProviders {
    return {
      ngModule: FSAStorefrontModule,
      providers: [provideConfig(config)]
    };
  }
}
