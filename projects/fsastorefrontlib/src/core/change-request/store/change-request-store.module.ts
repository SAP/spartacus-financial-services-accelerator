import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '@spartacus/core';
import { CHANGE_REQUEST_FEATURE } from './change-request-state';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';
import { ChangeRequestPersistenceService } from '../facade/change-request-persistence.service';

export function changeRequestStatePersistenceFactory(
  changeRequestStatePersistenceService: ChangeRequestPersistenceService
): () => void {
  const result = () => changeRequestStatePersistenceService.initSync();
  return result;
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule,
    StoreModule.forFeature(CHANGE_REQUEST_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    reducerProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: changeRequestStatePersistenceFactory,
      deps: [ChangeRequestPersistenceService],
      multi: true,
    },
  ],
})
export class ChangeRequestStoreModule {}
