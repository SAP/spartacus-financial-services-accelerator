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
import { FORM_FEATURE } from './state';

export function fileConfigFactory(): StateConfig {
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          [`${FORM_FEATURE}.uploadedFiles.content.files`]: StorageSyncType.LOCAL_STORAGE,
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
    StoreModule.forFeature(FORM_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfigFactory(fileConfigFactory),
  ],
  providers: [reducerProvider],
})
export class FormStoreModule {}
