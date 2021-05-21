import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FSStorefrontModule } from '@spartacus/fsa-storefront';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { SiteContextModule } from '@spartacus/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FSStorefrontModule.withConfig({
      backend: {
        occ: {
          prefix: '/occ/v2/',
          baseUrl: environment.occBaseUrl,
        },
      },
      context: {
        baseSite: ['financial'],
        language: ['en', 'de'],
        currency: ['EUR'],
        urlParameters: ['baseSite', 'language', 'currency'],
      },
      authentication: {
        client_id: 'financial_customer',
        client_secret: 'secret',
      },
      features: {
        consignmentTracking: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    SiteContextModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
