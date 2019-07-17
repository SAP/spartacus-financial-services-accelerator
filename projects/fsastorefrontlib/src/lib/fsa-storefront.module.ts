import { NgModule, ModuleWithProviders } from '@angular/core';
import { provideConfig, ConfigModule } from '@spartacus/core';
import { StorefrontConfig, B2cStorefrontModule, PageComponentModule } from '@spartacus/storefront';
import { translations, translationChunksConfig  } from '@spartacus/assets';

import { MyAccountModule } from './my-account/index';
import { UiModule } from './ui/index';
import { CmsLibModule } from './cms-lib/cms-lib.module';
import { fstranslations } from '../translations';
import { fsaLayoutConfig, fsaCmsContentConfig } from './default-fsa.config';
import { CheckoutModule } from './checkout';
import { FSRegisterComponent } from './cms-lib/user/register/fs-register.component';


@NgModule({
  imports: [
    UiModule,
    PageComponentModule,
    CmsLibModule,
    MyAccountModule,
    B2cStorefrontModule,
    CheckoutModule,
    ConfigModule.forRoot(),
    ConfigModule.withConfig({
      i18n: {
        resources: {
          en: translations.en
        },
        chunks: translationChunksConfig
      },
      cmsComponents: {
        RegisterCustomerComponent: {
          component: FSRegisterComponent
        }
      },
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
            type: [],
          },
          {
            id: 'addOptionsStep',
            name: 'fscommon.addOptions',
            routeName: 'addOptions',
            type: [],
          },
          {
            id: 'quoteReviewStep',
            name: 'quote.quoteReview',
            routeName: 'quoteReview',
            type: [],
          },
          {
            id: 'checkoutPaymentDetailsStep',
            name: 'fscommon.paymentDetails',
            routeName: 'checkoutPaymentDetails',
            type: [],
          },
          {
            id: 'finalReviewStep',
            name: 'fscommon.finalReview',
            routeName: 'finalReview',
            type: [],
          },
          {
            id: 'orderConfirmationStep',
            name: 'fscommon.orderConfirmation',
            routeName: 'orderConfirmation',
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
