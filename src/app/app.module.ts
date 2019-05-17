import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { translations } from '@spartacus/storefront';

import { FSAStorefrontModule, fstranslations, fsaLayoutConfig, fsaCmsStructure } from '@fsa/storefront';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FSAStorefrontModule.withConfig({
      i18n: {
        resources: {
          en: {
            ...translations.en,
            ...fstranslations.en
          }
        }
      },
      ...fsaLayoutConfig,
      ...fsaCmsStructure,
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
