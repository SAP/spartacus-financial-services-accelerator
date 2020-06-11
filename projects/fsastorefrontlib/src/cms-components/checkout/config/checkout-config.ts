import { CheckoutConfig } from '@spartacus/storefront';
import { FSCheckoutStep } from '../../../occ';

export abstract class FSCheckoutConfig extends CheckoutConfig {
  checkout?: {
    steps: Array<FSCheckoutStep>;
  };
}
