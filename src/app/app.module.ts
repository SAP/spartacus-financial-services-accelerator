import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

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
        CMSInboxComponent: { selector: 'fsa-inbox' },
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
        },
        MultiTabsCategoryPageTemplate:{
          slots:[
            'Section1',
            'Section2',
          ]
        }
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
