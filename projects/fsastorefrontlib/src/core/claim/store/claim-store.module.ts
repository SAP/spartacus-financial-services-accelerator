import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from '../../user-request/effects/index';
import { reducerProvider, reducerToken, metaReducers } from './reducers/index';
import {
  ConfigModule,
  StateConfig,
  StateModule,
  StorageSyncType,
} from '@spartacus/core';
import { CLAIM_FEATURE } from './claim-state';

export function claimConfigFactory(): StateConfig {
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          [`${CLAIM_FEATURE}.claim.content.requestStatus`]: StorageSyncType.LOCAL_STORAGE,
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
    StoreModule.forFeature(CLAIM_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfigFactory(claimConfigFactory),
  ],
  providers: [reducerProvider],
})
export class ClaimStoreModule {}
