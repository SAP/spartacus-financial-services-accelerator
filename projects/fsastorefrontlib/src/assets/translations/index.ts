import { TranslationResources } from '@spartacus/core';
import {
  b2b,
  organization,
  productAssignments,
  potentialProductAssignments,
} from './en/b2b.en';
import { changeRequest } from './en/changeRequest.en';
import { claim } from './en/claim.en';
import { fscommon } from './en/common.en';
import { configureProduct } from './en/configureProduct.en';
import { forms } from './en/forms.en';
import { orderConfirmation } from './en/orderConfirmation.en';
import { policy } from './en/policy.en';
import { premiumCalendar } from './en/premiumCalendar.en';
import { quote } from './en/quote.en';
import { quoteReview } from './en/quoteReview.en';
import { userRequest } from './en/userRequest.en';
import { document } from './en/document.en';
import { common } from './overrides/en/common';
import { payment } from './overrides/en/payment';
import { myAccount } from './overrides/en/my-account';
import { address } from './overrides/en/address';
import { cart } from './overrides/en/cart';
import { consent } from './en/consent.en';
import { dashboard } from './en/dashboard.en';

export const fstranslations: TranslationResources = {
  b2b,
  claim,
  forms,
  fscommon,
  quote,
  policy,
  premiumCalendar,
  userRequest,
  document,
  changeRequest,
  configureProduct,
  quoteReview,
  orderConfirmation,
  organization,
  productAssignments,
  potentialProductAssignments,
  consent,
  dashboard,
};

export const fsOverrides: TranslationResources = {
  payment,
  common,
  myAccount,
  address,
  cart,
};
