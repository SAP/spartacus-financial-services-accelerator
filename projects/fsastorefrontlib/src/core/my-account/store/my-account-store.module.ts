import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from './effects/index';
import { reducerProvider, reducerToken, metaReducers } from './reducers/index';
import { StateModule } from '@spartacus/core';
import { MY_ACCOUNT_FEATURE } from './my-account-state';
import { MyAccountPersistenceService } from '../services/my-account-persistance.service';

export function claimStatePersistenceFactory(
  claimPersistenceService: MyAccountPersistenceService
): () => void {
  const result = () => claimPersistenceService.initSync();
  return result;
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule,
    StoreModule.forFeature(MY_ACCOUNT_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    reducerProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: claimStatePersistenceFactory,
      deps: [MyAccountPersistenceService],
      multi: true,
    },
  ],
})
export class MyAccountStoreModule {}
