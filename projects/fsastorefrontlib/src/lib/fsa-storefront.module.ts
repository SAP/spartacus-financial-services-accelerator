import { NgModule, ModuleWithProviders } from '@angular/core';
import { provideConfig, ConfigModule } from '@spartacus/core';
import { StorefrontConfig, B2cStorefrontModule, PageComponentModule, b2cLayoutConfig } from '@spartacus/storefront';
import { translations } from '@spartacus/assets';

import { MyAccountModule } from './my-account/index';
import { UiModule } from './ui/index';
import { CmsLibModule } from './cms-lib/cms-lib.module';
import { fstranslations } from '../translations';
import { fsaLayoutConfig, fsaCmsContentConfig } from './default-fsa.config';

@NgModule({
  imports: [
    UiModule,
    PageComponentModule,
    CmsLibModule,
    MyAccountModule,
    B2cStorefrontModule,
    ConfigModule.forRoot(),
    ConfigModule.withConfig({
      i18n: {
        resources: {
          en: translations.en
        }
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
    ConfigModule.withConfigFactory(fsaCmsContentConfig)
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
