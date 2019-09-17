import { InjectionToken, Provider } from '@angular/core';
import * as fromCheckout from './fs-checkout.reducer';

import { ActionReducerMap } from '@ngrx/store';
import { FSCheckoutState, FSCheckoutStepsState } from '../fs-checkout-state';
import { loaderReducer, CHECKOUT_DETAILS } from '@spartacus/core';

export function getReducers(): ActionReducerMap<FSCheckoutState> {
  return {
    steps: loaderReducer<FSCheckoutStepsState>(
      CHECKOUT_DETAILS,
      fromCheckout.reducer
    )
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<FSCheckoutState>
> = new InjectionToken<ActionReducerMap<FSCheckoutState>>('CheckoutReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
