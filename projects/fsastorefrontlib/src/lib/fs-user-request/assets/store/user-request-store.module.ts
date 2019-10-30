import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from './effects/index';
import { reducerProvider, reducerToken } from './reducers/index';
import { StateConfig, StorageSyncType, StateModule, ConfigModule } from '@spartacus/core';

export function userRequestConfigFactory(): StateConfig {
    console.log('u storage sam');
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          [`userRequest.content.requestId`]: StorageSyncType.LOCAL_STORAGE
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
    StoreModule.forFeature('userRequest', reducerToken),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfigFactory(userRequestConfigFactory),
  ],
  providers: [reducerProvider],
})
export class UserRequestStoreModule {}
