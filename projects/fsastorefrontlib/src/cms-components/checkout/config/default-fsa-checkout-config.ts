import { CheckoutConfig } from '@spartacus/storefront';

export const fsaCheckoutConfig: CheckoutConfig = {
  checkout: {
    steps: [
        {
          id: 'comparisonCheckoutStep',
          name: 'fscommon.whatsIncluded',
          routeName: 'category',
          type: [],
        },
        {
          id: 'addOptionsStep',
          name: 'fscommon.addOptions',
          routeName: 'addOptions',
          type: [],
        },
        {
          id: 'quoteReviewStep',
          name: 'quote.quoteReview',
          routeName: 'quoteReview',
          type: [],
        },
        {
          id: 'checkoutPaymentDetailsStep',
          name: 'fscommon.paymentDetails',
          routeName: 'checkoutPaymentDetails',
          type: [],
        },
        {
          id: 'finalReviewStep',
          name: 'fscommon.finalReview',
          routeName: 'finalReview',
          type: [],
        },
        {
          id: 'orderConfirmationStep',
          name: 'fscommon.orderConfirmation',
          routeName: 'orderConfirmation',
          type: [],
        }
      ]
  },
};
