import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
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
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    SiteContextModule.forRoot(),
    FSModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
