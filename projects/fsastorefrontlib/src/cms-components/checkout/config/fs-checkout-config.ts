import { CheckoutConfig } from '@spartacus/storefront';
import { FSCheckoutStep } from './../../../lib/checkout/assets/components/checkout-progress/fs-checkout-step.component';

export abstract class FSCheckoutConfig extends CheckoutConfig {
  checkout?: {
    steps: Array<FSCheckoutStep>;
  };
}
