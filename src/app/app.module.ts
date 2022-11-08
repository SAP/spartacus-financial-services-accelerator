import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SiteContextModule } from '@spartacus/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FSModule } from './spartacus/fs.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SiteContextModule.forRoot(),
    // Store Devtools provides developer tools and instrumentation for Store like Redux DevTools for debugging application's state changes.
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    FSModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
