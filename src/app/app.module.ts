import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FSAStorefrontModule } from '@fsa/storefront';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FSAStorefrontModule.withConfig({
      server: {
        baseUrl: 'https://financialservices.local:9002'
      },
      site: {
        baseSite: 'insurance',
        currency: 'EUR'
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
