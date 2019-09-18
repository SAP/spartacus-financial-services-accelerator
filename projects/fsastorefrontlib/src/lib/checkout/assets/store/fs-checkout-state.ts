import { LoaderState } from '@spartacus/core';

export const CHECKOUT_FEATURE = 'checkout';

export interface FSStateWithCheckout {
  [CHECKOUT_FEATURE]: FSCheckoutState;
}

export interface FSCheckoutStepsState {
  legalInformation: boolean;
  identificationType: boolean;
}

export interface FSCheckoutState {
  steps: LoaderState<FSCheckoutStepsState>;
}
