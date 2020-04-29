import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '@spartacus/core';
import { effects } from './effects/index';
import { FORM_FEATURE } from './form-definition-state';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule,
    StoreModule.forFeature(FORM_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
  providers: [reducerProvider],
})
export class FormDefinitionStoreModule {}
