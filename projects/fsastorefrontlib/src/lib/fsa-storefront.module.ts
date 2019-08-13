import { NgModule, ModuleWithProviders } from '@angular/core';
import { provideConfig, ConfigModule } from '@spartacus/core';
import { StorefrontConfig, B2cStorefrontModule, PageComponentModule, defaultCmsContentConfig } from '@spartacus/storefront';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { FormioModule } from 'angular-formio';

import { MyAccountModule } from './my-account/index';
import { UiModule } from './ui/index';
import { CmsLibModule } from './cms-lib/cms-lib.module';
import { fstranslations } from '../translations';
import { fsaLayoutConfig } from './../recipes/config/default-fsa-layout-config';
import { fsaRoutingConfig } from './../cms-structure/routing/default-fsa-routing-config';
import { CheckoutModule } from './checkout';
import { FSRegisterModule } from './cms-lib/user/register/fs-register.module';
import { fsaCheckoutConfig } from '../cms-components/checkout/config/default-fsa-checkout-config';


@NgModule({
  imports: [
    FormioModule,
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
    ConfigModule.withConfigFactory(defaultCmsContentConfig),
    ConfigModule.withConfig(fsaRoutingConfig),
    ConfigModule.withConfig(fsaCheckoutConfig),
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
