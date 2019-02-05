import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FSAStorefrontModule } from '@fsa/storefront';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FSAStorefrontModule.withConfig({
      server: {
        baseUrl: 'https://financialservices.local:9002'
      },
      site: {
        baseSite: 'insurance'
      },
      authentication: {
        client_id: 'financial_customer',
        client_secret: 'secret'
      },
      cmsComponents: {
        EnrichedResponsiveBannerComponent: { selector: 'fsa-enriched-responsive-banner' },
        CMSViewPoliciesComponent: { selector: 'fsa-view-policies' },
        CMSViewQuotesComponent: { selector: 'fsa-view-quotes' },
        JspIncludeComponent: { selector: 'fsa-insurance-jsp-include' },
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
        }

      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
