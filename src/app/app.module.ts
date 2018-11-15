import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FSAStorefrontModule } from '@fsa/storefront';
import { FsaFooterNavigationModule } from 'projects/fsastorefrontlib/src/lib/footer-navigation/fsa-footer-navigation.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FsaFooterNavigationModule,
    FSAStorefrontModule.withConfig({
      server: {
        baseUrl: 'https://financialservices.dev-ded1-2.yrd.rot.hybris.com:9002'
      },
      site: {
        baseSite: 'insurance'
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
