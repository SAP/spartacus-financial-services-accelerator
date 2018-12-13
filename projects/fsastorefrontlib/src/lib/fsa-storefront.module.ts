import { NgModule, ModuleWithProviders } from '@angular/core';
import { ConfigModule, provideConfig } from '@spartacus/core';

import { MyAccountModule } from './my-account/index';
import { StorefrontModuleConfig, StorefrontModule, CmsModuleConfig } from '@spartacus/storefront';
import { UiModule } from './ui/index';
import { FsaBannerModule } from './cms-lib/banner/fsa-banner.module';

@NgModule({
  imports: [
    UiModule,
    MyAccountModule,
    FsaBannerModule,
    StorefrontModule,
    ConfigModule.forRoot()
  ],
  exports: [
    StorefrontModule,
    MyAccountModule,
    FsaBannerModule
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
  static withCmsConfig(config?: CmsModuleConfig): ModuleWithProviders {
    return {
      ngModule: FSAStorefrontModule,
      providers: [provideConfig(config)]
    };
  }
}
