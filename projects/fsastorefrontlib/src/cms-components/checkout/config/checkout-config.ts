import { CheckoutConfig } from '@spartacus/storefront';
import { FSCheckoutStep } from '../components/checkout-progress/checkout-step.component';

export abstract class FSCheckoutConfig extends CheckoutConfig {
  checkout?: {
    steps: Array<FSCheckoutStep>;
  };
}
