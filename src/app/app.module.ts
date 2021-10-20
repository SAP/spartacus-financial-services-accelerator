import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
    SiteContextModule.forRoot(),
    FSModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
