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
        FinancialServicesProductFeatureComponent : { selector: 'fsa-product-feature' },
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
