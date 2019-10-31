import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from './effects/index';
import { reducerProvider, reducerToken, metaReducers } from './reducers/index';
import { StateConfig, StorageSyncType, StateModule, ConfigModule } from '@spartacus/core';
import { USER_REQUEST_FEATURE } from './user-request-state';

export function userRequestConfigFactory(): StateConfig {
    const config: StateConfig = {
        state: {
          storageSync: {
            keys: {
              [`${USER_REQUEST_FEATURE}.userRequest`]: StorageSyncType.LOCAL_STORAGE
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
    StoreModule.forFeature(USER_REQUEST_FEATURE, reducerToken, {metaReducers}),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfigFactory(userRequestConfigFactory),
  ],
  providers: [reducerProvider],
})
export class UserRequestStoreModule {}
