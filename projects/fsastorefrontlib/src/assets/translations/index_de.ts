import { TranslationResources } from '@spartacus/core';
import { b2b } from './de/b2b.de';
import { changeRequest } from './de/changeRequest.de';
import { claim } from './de/claim.de';
import { fscommon } from './de/common.de';
import { configureProduct } from './de/configureProduct.de';
import { forms } from './de/forms.de';
import { orderConfirmation } from './de/orderConfirmation.de';
import { miniCart } from './overrides/de/miniCart';
import { payment } from './overrides/de/payment';
import { myAccount } from './overrides/de/myAccount';
import { policy } from './de/policy.de';
import { premiumCalendar } from './de/premiumCalendar.de';
import { quote } from './de/quote.de';
import { quoteReview } from './de/quoteReview.de';
import { userRequest } from './de/userRequest.de';
import { common } from './overrides/de/common';
import { user } from './overrides/de/user';
import { address } from './overrides/de/address';

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
};

export const fsOverridesDe: TranslationResources = {
  user,
  payment,
  miniCart,
  common,
  myAccount,
  address,
};
