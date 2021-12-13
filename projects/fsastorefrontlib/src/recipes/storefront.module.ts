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
import { defaultFSCmsContentProviders } from './config/fs-static-cms-structure';
import { FSGlobalMessageModule } from '../core/global-message/global-message.module';
import { occUserConfig } from '../occ/services/default-occ-user-config';
import { fsDefaultDateFormatConfigFactory } from '../core/date-config/default-date-config';
import { fsDefaultQuoteComparisonConfigFactory } from '../core/quote-comparison-config/default-quote-comparison-config';
import { iconConfig } from '../core/icon-config/icon-config';

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
  providers: [
    ...defaultFSCmsContentProviders,
    provideConfig(occUserConfig),
    provideConfig(iconConfig),
    provideDefaultConfigFactory(fsDefaultDateFormatConfigFactory),
    provideDefaultConfigFactory(fsDefaultQuoteComparisonConfigFactory),
  ],
})
export class FSStorefrontModule {
  static withConfig(config?: Config): ModuleWithProviders<FSStorefrontModule> {
    return {
      ngModule: FSStorefrontModule,
      providers: [provideConfig(config)],
    };
  }
}
