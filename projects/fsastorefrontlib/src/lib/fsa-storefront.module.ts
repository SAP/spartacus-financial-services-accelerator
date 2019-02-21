import { NgModule, ModuleWithProviders } from '@angular/core';
import { provideConfig } from '@spartacus/core';

import { MyAccountModule } from './my-account/index';
import { StorefrontModuleConfig, StorefrontModule } from '@spartacus/storefront';
import { UiModule } from './ui/index';
import { CmsLibModule } from './cms-lib/cms-lib.module';

@NgModule({
  imports: [
    UiModule,
    CmsLibModule,
    MyAccountModule,
    StorefrontModule
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
