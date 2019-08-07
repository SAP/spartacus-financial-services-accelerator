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
           baseUrl: 'https://financialservices.dev-ded1-2.yrd.rot.hybris.com:9002'
       }
      },
      context: {
        baseSite: [
          'insurance',
        ],
        language: ['en'],
        currency: ['EUR'],
        urlParameters: ['baseSite', 'language', 'currency'],
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
