import { FSCheckoutConfig } from './fs-checkout-config';

export const fsaCheckoutConfig: FSCheckoutConfig = {
  checkout: {
    steps: [
      {
        id: 'chooseCoverStep',
        name: 'fscommon.chooseCover',
        routeName: 'generalInformation',
        icon: 'icon-FSA-lock',
        type: [],
        restrictedCategories: ['insurances_event']
      },
      {
        id: 'comparisonCheckoutStep',
        name: 'fscommon.whatsIncluded',
        routeName: 'category',
        icon: 'icon-FSA-selected-item',
        type: []
      },
      {
        id: 'addOptionsStep',
        name: 'fscommon.addOptions',
        routeName: 'addOptions',
        icon: 'icon-FSA-list',
        type: []
      },
      {
        id: 'quoteReviewStep',
        name: 'quote.quoteReview',
        routeName: 'quoteReview',
        icon: 'icon-FSA-shield',
        type: []
      },
      {
        id: 'checkoutPaymentDetailsStep',
        name: 'fscommon.paymentDetails',
        routeName: 'checkoutPaymentDetails',
        icon: 'icon-FSA-payment-cards',
        type: []
      },
      {
        id: 'finalReviewStep',
        name: 'fscommon.finalReview',
        routeName: 'finalReview',
        icon: 'icon-FSA-review',
        type: []
      }
    ]
  },
};
