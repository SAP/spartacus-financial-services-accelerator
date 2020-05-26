import {
  CheckoutStepsState,
  CheckoutState,
  StateUtils,
} from '@spartacus/core';

export const CHECKOUT_FEATURE = 'checkout';

export interface FSStateWithCheckout {
  [CHECKOUT_FEATURE]: FSCheckoutState;
}

export interface FSCheckoutStepsState extends CheckoutStepsState {
  legalInformation: boolean;
  identificationType: boolean;
}

export interface FSCheckoutState extends CheckoutState {
  steps: StateUtils.LoaderState <FSCheckoutStepsState>;
}
