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
        baseUrl: 'https://financialservices.dev-ded1-2.yrd.rot.hybris.com:9002'
      },
      site: {
        baseSite: 'insurance'
      },
      authentication: {
        client_id: 'financial_customer',
        client_secret: 'secret'
      },
      cmsComponentMapping: {
        CMSViewPoliciesComponent: 'fsa-view-policies',
        CMSViewQuotesComponent: 'fsa-view-quotes'
      },

    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
