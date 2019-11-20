import { RoutesConfig, RoutingConfig } from '@spartacus/core';

export const fsaStorefrontRoutesConfig: RoutesConfig = {
  generalInformation: {
    paths: ['checkout/generalInformation/:formCode'],
    paramsMapping: { formCode: 'code' },
  },
  category: { paths: ['checkout/c/:categoryCode'] },
  addOptions: { paths: ['checkout/add-options'] },
  personalDetails: {
    paths: ['checkout/personal-details/:formCode'],
  },
  quoteReview: { paths: ['checkout/quote-review'] },
  checkoutPaymentDetails: { paths: ['checkout/payment-details'] },
  finalReview: { paths: ['checkout/final-review'] },
  legalInformation: { paths: ['checkout/legal-information'] },
  userIdentification: { paths: ['checkout/user-identification'] },
  orderConfirmation: { paths: ['checkout/order-confirmation'] },
  paymentDetails: { paths: ['my-account/payment-details'] },
  consentManagment: { paths: ['my-account/consents'] },
  updateEmail: { paths: ['my-account/update-email'] },
  updatePasswordComp: { paths: ['my-account/update-password'] },
  closeAccount: { paths: ['my-account/close-account'] },
  claims: { paths: ['my-account/my-insurance-claims'] },
  inbox: { paths: ['my-account/inbox'] },
  policies: { paths: ['my-account/my-policies'] },
  policyDetails: { paths: ['my-account/my-policies/:policyId/:contractId'] },
  quotes: { paths: ['my-account/my-financial-applications'] },
  premiumCalendar: { paths: ['my-account/premium-calendar'] },
  orderHistory: { paths: ['my-account/orders'] },
  accountOverview: { paths: ['my-account/account-overview'] },
  fnolIncidentPage: { paths: ['fnolIncidentPage'] },
  fnolIncidentReportPage: { paths: ['fnolIncidentReportPage'] },
  fnolGeneralInfoPage: { paths: ['fnolGeneralInfoPage'] },
  fnolSummaryPage: { paths: ['fnolSummaryPage'] },
};

export const fsaRoutingConfig: RoutingConfig = {
  routing: {
    routes: fsaStorefrontRoutesConfig,
  },
};
