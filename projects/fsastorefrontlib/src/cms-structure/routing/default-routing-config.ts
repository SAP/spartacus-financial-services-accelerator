import { RoutesConfig, RoutingConfig } from '@spartacus/core';

export const storefrontRoutesConfig: RoutesConfig = {
  generalInformation: {
    paths: ['checkout/generalInformation/:formCode'],
    paramsMapping: { formCode: 'code' },
  },
  configureProduct: {
    paths: ['checkout/configureProduct/:productCode'],
    paramsMapping: { productCode: 'code' },
  },
  category: {
    paths: ['checkout/c/:categoryCode'],
  },
  addOptions: { paths: ['checkout/add-options'] },
  checkoutPersonalDetails: {
    paths: ['checkout/personal-details'],
  },
  quoteReview: { paths: ['checkout/quote-review'] },
  checkoutPaymentDetails: { paths: ['checkout/payment-details'] },
  finalReview: { paths: ['checkout/final-review'] },
  legalInformation: { paths: ['checkout/legal-information'] },
  userIdentification: { paths: ['checkout/user-identification'] },
  orderConfirmation: { paths: ['checkout/order-confirmation'] },
  paymentDetails: { paths: ['my-account/payment-details'] },
  consentManagment: { paths: ['my-account/consents'] },
  personalDetails: { paths: ['my-account/fs-update-profile'] },
  updateEmail: { paths: ['my-account/update-email'] },
  updatePasswordComp: { paths: ['my-account/update-password'] },
  closeAccount: { paths: ['my-account/close-account'] },
  claims: { paths: ['my-account/my-insurance-claims'] },
  noClaims: { paths: ['noClaims'] },
  claimsPage: { paths: ['claimsPage'] },
  contactAgent: { paths: ['contact-agent/:agent'] },
  productActivation: { paths: ['orgUnit/:orgUnitId/productActivation'] },
  productAssignment: { paths: ['orgUnit/:orgUnitId/productAssignments'] },
  unitDetails: { paths: ['orgUnit/:orgUnitId'] },
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
  fnolConfirmationPage: { paths: ['fnolConfirmationPage'] },
  changeCarDetailsPage: { paths: ['changeCarDetailsPage'] },
  changeCoveragePage: { paths: ['changeCoveragePage'] },
  changeSimulationPage: { paths: ['changeSimulationPage'] },
};

export const routingConfig: RoutingConfig = {
  routing: {
    routes: storefrontRoutesConfig,
  },
};
