import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { CHECKOUT_DETAILS, StateUtils } from '@spartacus/core';
import { FSCheckoutState, FSCheckoutStepsState } from '../checkout-state';
import * as fromAddressVerification from './address-verification.reducer';
import * as fromCardTypes from './card-types.reducer';
import * as fromCheckout from './checkout.reducer';

export function getReducers(): ActionReducerMap<FSCheckoutState> {
  return {
    steps: StateUtils.loaderReducer<FSCheckoutStepsState>(
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
