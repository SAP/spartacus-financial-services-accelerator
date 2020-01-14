import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from './effects/index';
import { reducerProvider, reducerToken, metaReducers } from './reducers/index';
import {
  StateConfig,
  StorageSyncType,
  StateModule,
  ConfigModule,
} from '@spartacus/core';

export function claimConfigFactory(): StateConfig {
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          [`assets.claims.content.claimNumber`]: StorageSyncType.LOCAL_STORAGE,
          [`assets.claims.content.claimStatus`]: StorageSyncType.LOCAL_STORAGE,
        },
      },
    },
  };
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule,
    StoreModule.forFeature('assets', reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfigFactory(claimConfigFactory),
  ],
  providers: [reducerProvider],
})
export class ClaimStoreModule {}
