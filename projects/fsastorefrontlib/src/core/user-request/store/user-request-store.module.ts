import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { userRequestEffects } from './effects/index';
import { reducerProvider, reducerToken, metaReducers } from './reducers/index';
import { StateModule } from '@spartacus/core';
import { USER_REQUEST_FEATURE } from './user-request-state';
import { UserRequestPersistenceService } from '../services/user-request-persistance.service';

export function userRequestStatePersistenceFactory(
  userRequestPersistenceService: UserRequestPersistenceService
): () => void {
  const result = () => userRequestPersistenceService.initSync();
  return result;
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule,
    StoreModule.forFeature(USER_REQUEST_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(userRequestEffects),
  ],
  providers: [
    reducerProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: userRequestStatePersistenceFactory,
      deps: [UserRequestPersistenceService],
      multi: true,
    },
  ],
})
export class UserRequestStoreModule {}
