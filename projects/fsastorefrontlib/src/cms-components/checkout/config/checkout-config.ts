import { CheckoutConfig } from '@spartacus/checkout/base/root';
import { FSCheckoutStep } from '../../../occ/occ-models/occ.models';

export abstract class FSCheckoutConfig extends CheckoutConfig {
  checkout?: {
    steps: Array<FSCheckoutStep>;
  };
}
