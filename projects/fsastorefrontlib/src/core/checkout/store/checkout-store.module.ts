import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '@spartacus/core';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';
import { FS_CHECKOUT_FEATURE } from './checkout-state';
import { CheckoutPersistenceService } from '../facade/checkout-persistance.service';

export function checkoutStatePersistenceFactory(
  checkoutPersistenceService: CheckoutPersistenceService
): () => void {
  const result = () => checkoutPersistenceService.initSync();
  return result;
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule,
    StoreModule.forFeature(FS_CHECKOUT_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    reducerProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: checkoutStatePersistenceFactory,
      deps: [CheckoutPersistenceService],
      multi: true,
    },
  ],
})
export class FSCheckoutStoreModule {}
