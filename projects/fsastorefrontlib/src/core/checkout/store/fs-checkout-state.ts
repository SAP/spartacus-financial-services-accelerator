import {
  LoaderState,
  CheckoutStepsState,
  StateWithCheckout,
  CheckoutState,
  CardTypesState,
  AddressVerificationState,
} from '@spartacus/core';

export const CHECKOUT_FEATURE = 'checkout';

export interface FSStateWithCheckout {
  [CHECKOUT_FEATURE]: FSCheckoutState;
}

export interface FSCheckoutStepsState extends CheckoutStepsState {
  legalInformation: boolean;
  identificationType: boolean;
}

export interface FSCheckoutState {
  steps: LoaderState<FSCheckoutStepsState>;
  cardTypes: CardTypesState;
  addressVerification: AddressVerificationState;
}
