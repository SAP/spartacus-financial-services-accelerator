import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  ConfigModule,
  StateConfig,
  StateModule,
  StorageSyncType,
} from '@spartacus/core';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';
import { CHANGE_REQUEST_FEATURE } from './change-request-state';

export function userRequestConfigFactory(): StateConfig {
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          [`changeRequests.changeRequest.content.requestId`]: StorageSyncType.LOCAL_STORAGE,
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
    StoreModule.forFeature(CHANGE_REQUEST_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfigFactory(userRequestConfigFactory),
  ],
  providers: [reducerProvider],
})
export class ChangeRequestStoreModule {}
