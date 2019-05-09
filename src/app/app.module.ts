import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FSAStorefrontModule, translations1 } from '@fsa/storefront';
import { AppComponent } from './app.component';
import { translations } from '@spartacus/storefront';
// import { translations1 } from '../../projects/fsastorefrontlib/src/translations/index';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FSAStorefrontModule.withConfig({
      i18n: {
        resources: translations1
      },
      backend: {
        occ: {
           baseUrl: 'https://financialservices.local:9002'
       }
     },
      site: {
        baseSite: 'insurance',
        currency: 'EUR',
        language: 'en'
      },
      authentication: {
        client_id: 'financial_customer',
        client_secret: 'secret'
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
