import { NgModule, ModuleWithProviders } from '@angular/core';
import { ConfigModule, provideConfig } from '@spartacus/core';

import { MyAccountModule } from './my-account/index';
import { StorefrontModuleConfig, StorefrontModule } from '@spartacus/storefront';
import { UiModule } from './ui/index';
import { CmsLibModule } from './cms-lib/cms-lib.module';

@NgModule({
  imports: [
    UiModule,
    CmsLibModule,
    MyAccountModule,
    StorefrontModule,
    ConfigModule.withConfig({
      cmsComponents: {
        EnrichedResponsiveBannerComponent: { selector: 'fsa-enriched-responsive-banner' },
        CMSViewPoliciesComponent: { selector: 'fsa-view-policies' },
        CMSViewQuotesComponent: { selector: 'fsa-view-quotes' },
        FinancialServicesProductFeatureComponent: { selector: 'fsa-product-feature' }
      },
      layoutSlots: {
        InsuranceLandingPageTemplate: {
          slots: [
            'Section1',
            'Section2A',
            'Section2B',
            'Section2C',
            'Section3',
            'Section4',
            'Section5'
          ]
        },
        FSCategoryPageTemplate: {
          slots: [
            'Section1',
            'Section2A',
            'Section2B',
            'Section3',
            'Section4'
          ]
        }
      }
      }
    )
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
