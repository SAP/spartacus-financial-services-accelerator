import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FSAStorefrontModule } from '@fsa/storefront';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FSAStorefrontModule.withConfig({
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
