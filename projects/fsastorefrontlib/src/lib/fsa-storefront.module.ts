import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConfigModule, provideConfig } from '@spartacus/core';
import {
  StorefrontModuleConfig,
  StorefrontModule,
  GlobalMessageModule
} from '@spartacus/storefront';

import { FsaStorefrontComponent } from './fsa-storefront.component';
import { FsaHeaderModule} from './ui/layout/fsa-header/fsa-header.module';
import { MyAccountModule } from './my-account/index';
import { UiModule } from './ui/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GlobalMessageModule,
    UiModule,
    FsaHeaderModule,
    MyAccountModule,
    StorefrontModule,
    ConfigModule.forRoot()
  ],
  declarations: [FsaStorefrontComponent],
  exports: [StorefrontModule, FsaStorefrontComponent]
})
export class FSAStorefrontModule {
  static withConfig(config?: StorefrontModuleConfig): ModuleWithProviders {
    return {
      ngModule: FSAStorefrontModule,
      providers: [provideConfig(config)]
    };
  }
}
