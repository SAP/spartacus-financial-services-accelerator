import { NgModule, ModuleWithProviders } from '@angular/core';
import { ConfigModule, provideConfig } from '@spartacus/core';

import { MyAccountModule } from './my-account/index';
import { StorefrontModuleConfig, StorefrontModule } from '@spartacus/storefront';
import { UiModule } from './ui/index';
import { FsaFooterNavigationModule } from './footer-navigation/fsa-footer-navigation.module';
import { FsaNavigationModule } from './navigation/fsa-navigation.module';

@NgModule({
  imports: [
    UiModule,
    MyAccountModule,
    FsaNavigationModule,
    FsaFooterNavigationModule,
    StorefrontModule,
    ConfigModule.forRoot()
  ],
  exports: [StorefrontModule, MyAccountModule],
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
