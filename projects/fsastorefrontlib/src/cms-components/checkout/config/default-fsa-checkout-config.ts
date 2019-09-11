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
        restrictedCategories: ['banking_current_account', 'banking_credit_card', 'insurances_event']
      },
      {
        id: 'comparisonCheckoutStep',
        name: 'fscommon.whatsIncluded',
        routeName: 'category',
        icon: 'icon-FSA-selected-item',
        type: [],
        restrictedCategories: []
      },
      {
        id: 'addOptionsStep',
        name: 'fscommon.addOptions',
        routeName: 'addOptions',
        icon: 'icon-FSA-list',
        type: [],
        restrictedCategories: []
      },
      {
        id: 'quoteReviewStep',
        name: 'quote.quoteReview',
        routeName: 'quoteReview',
        icon: 'icon-FSA-shield',
        type: [],
        restrictedCategories: []
      },
      {
        id: 'legalInformationStep',
        name: 'fscommon.legalInformation',
        routeName: 'legalInformation',
        icon: 'icon-FSA-card-verify',
        type: [],
        restrictedCategories: ['insurances_travel', 'insurances_auto', 'insurances_event',
          'insurances_savings', 'insurances_life', 'insurances_property_homeowners', 'insurances_property_renters']
      },
      {
        id: 'checkoutPaymentDetailsStep',
        name: 'fscommon.paymentDetails',
        routeName: 'checkoutPaymentDetails',
        icon: 'icon-FSA-payment-cards',
        type: [],
        restrictedCategories: ['banking_credit_card', 'banking_current_account']
      },
      {
        id: 'finalReviewStep',
        name: 'fscommon.finalReview',
        routeName: 'finalReview',
        icon: 'icon-FSA-review',
        type: [],
        restrictedCategories: []
      }
    ]
  },
};
