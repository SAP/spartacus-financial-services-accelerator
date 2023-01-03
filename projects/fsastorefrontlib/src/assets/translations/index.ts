import { TranslationResources } from '@spartacus/core';
import { appointmentScheduling } from './en/appointment.en';
import {
  b2b,
  organization,
  potentialProductAssignments,
  productAssignments,
} from './en/b2b.en';
import { changeRequest } from './en/changeRequest.en';
import { claim } from './en/claim.en';
import { fscommon } from './en/common.en';
import { configureProduct } from './en/configureProduct.en';
import { consent } from './en/consent.en';
import { dashboard } from './en/dashboard.en';
import { document } from './en/document.en';
import { forms } from './en/forms.en';
import { orderConfirmation } from './en/orderConfirmation.en';
import { applicationConfirmation } from './en/applicationConfirmation.en';
import { policy } from './en/policy.en';
import { premiumCalendar } from './en/premiumCalendar.en';
import { productOverview } from './en/product-overview.en';
import { quote } from './en/quote.en';
import { quoteReview } from './en/quoteReview.en';
import { salesIllustration } from './en/sales-illustration.en';
import { userRequest } from './en/userRequest.en';
import { loan } from './en/loan.en';
import { address } from './overrides/en/address';
import { cart } from './overrides/en/cart';
import { common } from './overrides/en/common';
import { myAccount } from './overrides/en/my-account';
import { payment } from './overrides/en/payment';

export const fstranslations: TranslationResources = {
  b2b,
  claim,
  forms,
  fscommon,
  quote,
  policy,
  premiumCalendar,
  userRequest,
  loan,
  document,
  changeRequest,
  configureProduct,
  quoteReview,
  orderConfirmation,
  applicationConfirmation,
  organization,
  productAssignments,
  potentialProductAssignments,
  consent,
  dashboard,
  appointmentScheduling,
  salesIllustration,
  productOverview,
};

export const fsOverrides: TranslationResources = {
  payment,
  common,
  myAccount,
  address,
  cart,
};
