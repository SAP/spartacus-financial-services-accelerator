import { NgModule, ModuleWithProviders } from '@angular/core';
import { provideConfig, ConfigModule, I18nModule } from '@spartacus/core';

import { MyAccountModule } from './my-account/index';
import { StorefrontModuleConfig, StorefrontModule, PageComponentModule } from '@spartacus/storefront';
import { UiModule } from './ui/index';
import { CmsLibModule } from './cms-lib/cms-lib.module';

@NgModule({
  imports: [
    UiModule,
    PageComponentModule,
    CmsLibModule,
    I18nModule.forRoot(),
    MyAccountModule,
    StorefrontModule,
    ConfigModule.forRoot()
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
