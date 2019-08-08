import { CheckoutConfig } from '@spartacus/storefront';
import { FSCheckoutStep } from 'projects/fsastorefrontlib/src/lib/checkout/assets/components/checkout-progress/fs-checkout-step.component';

export declare abstract class FSCheckoutConfig extends CheckoutConfig {
  checkout?: {
    steps: Array<FSCheckoutStep>;
  };
}

export const fsaCheckoutConfig: FSCheckoutConfig = {
  checkout: {
    steps: [
      {
        id: 'comparisonCheckoutStep',
        name: 'fscommon.whatsIncluded',
        routeName: 'category',
        icon: 'icon-FSA-selected-item',
        type: [],
      },
      {
        id: 'addOptionsStep',
        name: 'fscommon.addOptions',
        routeName: 'addOptions',
        icon: 'icon-FSA-list',
        type: [],
      },
      {
        id: 'quoteReviewStep',
        name: 'quote.quoteReview',
        routeName: 'quoteReview',
        icon: 'icon-FSA-shield',
        type: [],
      },
      {
        id: 'checkoutPaymentDetailsStep',
        name: 'fscommon.paymentDetails',
        routeName: 'checkoutPaymentDetails',
        icon: 'icon-FSA-payment-cards',
        type: [],
      },
      {
        id: 'finalReviewStep',
        name: 'fscommon.finalReview',
        routeName: 'finalReview',
        icon: 'icon-FSA-review',
        type: [],
      }
    ]
  },
};
