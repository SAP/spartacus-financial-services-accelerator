import { NgModule, ModuleWithProviders } from '@angular/core';
import { provideConfig, ConfigModule } from '@spartacus/core';
import { StorefrontModuleConfig, StorefrontModule, PageComponentModule } from '@spartacus/storefront';
import { translations } from '@spartacus/storefront';

import { MyAccountModule } from './my-account/index';
import { UiModule } from './ui/index';
import { CmsLibModule } from './cms-lib/cms-lib.module';
import { fstranslations } from '../translations';

@NgModule({
  imports: [
    UiModule,
    PageComponentModule,
    CmsLibModule,
    MyAccountModule,
    StorefrontModule,
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
  ],
  exports: [
    StorefrontModule,
    MyAccountModule,
    CmsLibModule
  ],
  declarations: []
})
export class FSAStorefrontModule {
  static withConfig(config?: StorefrontModuleConfig): ModuleWithProviders {
    return {
      ngModule: FSAStorefrontModule,
      providers: [provideConfig(config)]
    };
  }
}
