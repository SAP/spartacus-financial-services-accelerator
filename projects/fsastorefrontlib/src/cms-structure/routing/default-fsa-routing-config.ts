import { RoutesConfig, RoutingConfig } from '@spartacus/core';

export const fsaStorefrontRoutesConfig: RoutesConfig = {
  category: { paths: ['checkout/c/:categoryCode'] },
  addOptions: { paths: ['checkout/add-options'] },
  quoteReview: { paths: ['checkout/quote-review'] },
  checkoutPaymentDetails: { paths: ['checkout/payment-details'] },
  finalReview: { paths: ['checkout/final-review'] },
  orderConfirmation: { paths: ['checkout/order-confirmation'] },
  paymentDetails: { paths: ['my-account/payment-details'] },
  consentManagment: { paths: ['my-account/consents'] },
  personalDetails: { paths: ['my-account/fs-update-profile'] },
  updateEmail: { paths: ['my-account/update-email'] },
  updatePasswordComp: { paths: ['my-account/update-password'] },
  closeAccount: { paths: ['my-account/close-account'] },
  claims: { paths: ['my-account/my-insurance-claims'] },
  inbox: { paths: ['my-account/inbox'] },
  policies: { paths: ['my-account/my-policies'] },
  policyDetails: { paths: ['my-account/my-policies/:policyId/:contractId'] },
  quotes: { paths: ['my-account/my-financial-applications'] },
  premiumCalendar: { paths: ['my-account/premium-calendar'] }
};

export const fsaRoutingConfig: RoutingConfig = {
  routing: {
    routes: fsaStorefrontRoutesConfig,
  },
};
