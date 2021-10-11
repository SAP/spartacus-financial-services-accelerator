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
import { CHANGE_REQUEST_FEATURE } from './change-request-state';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';

// export function userRequestConfigFactory(): StateConfig {
//   const config: StateConfig = {
//     state: {
//       storageSync: {
//         keys: {
//           [`${CHANGE_REQUEST_FEATURE}.changeRequest.value.content.requestId`]: StorageSyncType.LOCAL_STORAGE,
//           [`${CHANGE_REQUEST_FEATURE}.changeRequest.value.content.requestStatus`]: StorageSyncType.LOCAL_STORAGE,
//         },
//       },
//     },
//   };
//   return config;
// }

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
  providers: [reducerProvider],
})
export class ChangeRequestStoreModule {}
