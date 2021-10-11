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
import { MY_ACCOUNT_FEATURE } from './my-account-state';

// export function claimConfigFactory(): StateConfig {
//   const config: StateConfig = {
//     state: {
//       storageSync: {
//         keys: {
//           [`assets.claims.content.claimNumber`]: StorageSyncType.LOCAL_STORAGE,
//           [`assets.claims.content.claimStatus`]: StorageSyncType.LOCAL_STORAGE,
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
    StoreModule.forFeature(MY_ACCOUNT_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
  providers: [reducerProvider],
})
export class MyAccountStoreModule {}
