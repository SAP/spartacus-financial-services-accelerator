import { InjectionToken, Provider } from '@angular/core';
import * as fromCheckout from './fs-checkout.reducer';

import { ActionReducerMap } from '@ngrx/store';
import { FSCheckoutState, FSCheckoutStepsState } from '../fs-checkout-state';
import { loaderReducer, CHECKOUT_DETAILS } from '@spartacus/core';
import * as fromCardTypes from './card-types.reducer';
import * as fromAddressVerification from './address-verification.reducer';

export function getReducers(): ActionReducerMap<FSCheckoutState> {
  return {
    steps: loaderReducer<FSCheckoutStepsState>(
      CHECKOUT_DETAILS,
      fromCheckout.reducer
    ),
    cardTypes: fromCardTypes.reducer,
    addressVerification: fromAddressVerification.reducer,
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<FSCheckoutState>
> = new InjectionToken<ActionReducerMap<FSCheckoutState>>('CheckoutReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
