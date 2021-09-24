import {
  CheckoutStepsState,
  CheckoutState,
} from '@spartacus/checkout/core';
import {
  CheckoutConfig,
} from '@spartacus/checkout/root';
import { StateUtils } from '@spartacus/core';

export const CHECKOUT_FEATURE = 'checkout';

export interface FSStateWithCheckout {
  [CHECKOUT_FEATURE]: FSCheckoutState;
}

export interface FSCheckoutStepsState extends CheckoutStepsState {
  legalInformation: boolean;
  identificationType: boolean;
  paymentType: string;
}

export interface FSCheckoutState extends CheckoutState {
  steps: StateUtils.LoaderState<FSCheckoutStepsState>;
}
