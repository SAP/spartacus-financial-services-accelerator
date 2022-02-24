import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '@spartacus/core';
import { FormPersistenceService } from '../services/form-persistance.service';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';
import { FORM_FEATURE } from './state';

export function formStatePersistenceFactory(
  formStatePersistenceService: FormPersistenceService
): () => void {
  const result = () => formStatePersistenceService.initSync();
  return result;
}

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
  providers: [
    reducerProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: formStatePersistenceFactory,
      deps: [FormPersistenceService],
      multi: true,
    },
  ],
})
export class FormStoreModule {}
