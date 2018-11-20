import { NgModule, ModuleWithProviders } from '@angular/core';
import { ConfigModule, provideConfig } from '@spartacus/core';

import { MyAccountModule } from './my-account/index';
import { StorefrontModuleConfig, StorefrontModule } from '@spartacus/storefront';
import { UiModule } from './ui/index';
import { FsaHeaderModule } from './ui/layout/fsa-header/fsa-header.module';

@NgModule({
  imports: [
    UiModule,
    FsaHeaderModule,
    MyAccountModule,
    StorefrontModule,
    ConfigModule.forRoot()
  ],
  exports: [StorefrontModule, MyAccountModule, FsaHeaderModule],
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
