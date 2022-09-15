import { TranslationResources } from '@spartacus/core';
import { appointmentScheduling } from './de/appointment.de';
import {
  b2b,
  organization,
  potentialProductAssignments,
  productAssignments,
} from './de/b2b.de';
import { changeRequest } from './de/changeRequest.de';
import { claim } from './de/claim.de';
import { fscommon } from './de/common.de';
import { configureProduct } from './de/configureProduct.de';
import { dashboard } from './de/dashboard.de';
import { document } from './de/document.de';
import { forms } from './de/forms.de';
import { orderConfirmation } from './de/orderConfirmation.de';
import { policy } from './de/policy.de';
import { premiumCalendar } from './de/premiumCalendar.de';
import { quote } from './de/quote.de';
import { quoteReview } from './de/quoteReview.de';
import { salesIllustration } from './de/sales-illustration.de';
import { userRequest } from './de/userRequest.de';
import { address } from './overrides/de/address';
import { cart } from './overrides/de/cart';
import { common } from './overrides/de/common';
import { myAccount } from './overrides/de/my-account';
import { payment } from './overrides/de/payment';
import { product } from './overrides/de/product';
import { user } from './overrides/de/user';

export const fstranslationsDe: TranslationResources = {
  b2b,
  claim,
  forms,
  fscommon,
  quote,
  policy,
  premiumCalendar,
  userRequest,
  changeRequest,
  configureProduct,
  quoteReview,
  orderConfirmation,
  organization,
  productAssignments,
  potentialProductAssignments,
  document,
  dashboard,
  appointmentScheduling,
  salesIllustration,
};

export const fsOverridesDe: TranslationResources = {
  user,
  payment,
  common,
  myAccount,
  address,
  cart,
  product,
};
