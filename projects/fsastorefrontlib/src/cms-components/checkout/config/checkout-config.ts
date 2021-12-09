import { FSCheckoutStep } from '../../../occ/occ-models/occ.models';
import { CheckoutConfig } from '@spartacus/checkout/root';

export abstract class FSCheckoutConfig extends CheckoutConfig {
  checkout?: {
    steps: Array<FSCheckoutStep>;
  };
}
