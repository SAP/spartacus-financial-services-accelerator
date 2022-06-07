import { TranslationResources } from '@spartacus/core';
import {
  b2b,
  organization,
  productAssignments,
  potentialProductAssignments,
} from './de/b2b.de';
import { changeRequest } from './de/changeRequest.de';
import { claim } from './de/claim.de';
import { fscommon } from './de/common.de';
import { configureProduct } from './de/configureProduct.de';
import { forms } from './de/forms.de';
import { orderConfirmation } from './de/orderConfirmation.de';
import { payment } from './overrides/de/payment';
import { myAccount } from './overrides/de/my-account';
import { policy } from './de/policy.de';
import { premiumCalendar } from './de/premiumCalendar.de';
import { quote } from './de/quote.de';
import { quoteReview } from './de/quoteReview.de';
import { document } from './de/document.de';
import { userRequest } from './de/userRequest.de';
import { common } from './overrides/de/common';
import { user } from './overrides/de/user';
import { address } from './overrides/de/address';
import { cart } from './overrides/en/cart';
import { product } from './overrides/de/product';
import { dashboard } from './de/dashboard.de';
import { appointmentScheduling } from './de/appointment.de';

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
