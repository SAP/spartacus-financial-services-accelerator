import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FSAStorefrontModule } from '@fsa/storefront';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FSAStorefrontModule.withConfig({
      backend: {
        occ: {
          baseUrl: environment.occBaseUrl
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
export class AppModule { }
