import { FSCheckoutConfig } from './fs-checkout-config';
import { CheckoutStepType } from '@spartacus/storefront';

export const fsaCheckoutConfig: FSCheckoutConfig = {
  checkout: {
    steps: [
      {
        id: 'chooseCoverStep',
        name: 'fscommon.chooseCover',
        routeName: 'generalInformation',
        type: [],
        restrictedCategories: [
          'banking_current_account',
          'banking_credit_card',
          'insurances_event',
        ],
      },
      {
        id: 'comparisonCheckoutStep',
        name: 'fscommon.whatsIncluded',
        routeName: 'category',
        type: [],
        restrictedCategories: [],
      },
      {
        id: 'addOptionsStep',
        name: 'fscommon.addOptions',
        routeName: 'addOptions',
        type: [],
        restrictedCategories: [],
      },
      {
        id: 'personalDetailsStep',
        name: 'fscommon.personalDetails',
        routeName: 'personalDetails',
        type: [],
        restrictedCategories: [],
      },
      {
        id: 'quoteReviewStep',
        name: 'quote.quoteReview',
        routeName: 'quoteReview',
        type: [],
        restrictedCategories: [],
      },
      {
        id: 'legalInformationStep',
        name: 'fscommon.legalInformation',
        routeName: 'legalInformation',
        type: [],
        restrictedCategories: [
          'insurances_travel',
          'insurances_auto',
          'insurances_event',
          'insurances_savings',
          'insurances_life',
          'insurances_property_homeowners',
          'insurances_property_renters',
        ],
      },
      {
        id: 'userIdentificationStep',
        name: 'fscommon.userIdentification.title',
        routeName: 'userIdentification',
        type: [],
        restrictedCategories: [
          'insurances_travel',
          'insurances_auto',
          'insurances_event',
          'insurances_savings',
          'insurances_life',
          'insurances_property_homeowners',
          'insurances_property_renters',
        ],
      },
      {
        id: 'checkoutPaymentDetailsStep',
        name: 'fscommon.paymentDetails',
        routeName: 'checkoutPaymentDetails',
        type: [CheckoutStepType.PAYMENT_DETAILS],
        restrictedCategories: [
          'banking_credit_card',
          'banking_current_account',
        ],
      },
      {
        id: 'finalReviewStep',
        name: 'fscommon.finalReview',
        routeName: 'finalReview',
        type: [],
        restrictedCategories: [
          'banking_credit_card',
          'banking_current_account',
        ],
      },
    ],
  },
};
