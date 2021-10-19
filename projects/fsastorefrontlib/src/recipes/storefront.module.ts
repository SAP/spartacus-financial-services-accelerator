import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  Config,
  provideConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  BaseStorefrontModule,
  PageComponentModule,
} from '@spartacus/storefront';
import { CheckoutModule } from '../cms-components/checkout/checkout.module';
import { CmsLibModule } from '../cms-components/cms-lib.module';
import { OccModule } from '../occ/occ.module';
import { defaultFSCmsContentProviders } from './config/messages-cms-structure';
import { FSGlobalMessageModule } from '../core/global-message/global-message.module';

@NgModule({
  imports: [
    BaseStorefrontModule,
    PageComponentModule,
    CmsLibModule,
    CheckoutModule,
    OccModule,
    FSGlobalMessageModule.forRoot(),
  ],
  exports: [BaseStorefrontModule, CmsLibModule],
  declarations: [],
  providers: [...defaultFSCmsContentProviders],
})
export class FSStorefrontModule {
  static withConfig(config?: Config): ModuleWithProviders<FSStorefrontModule> {
    return {
      ngModule: FSStorefrontModule,
      providers: [provideConfig(config), ...defaultFSCmsContentProviders],
    };
  }
}
