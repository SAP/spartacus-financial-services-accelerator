import { TranslationResources } from '@spartacus/core';
import { b2b } from './en/b2b.en';
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
import { miniCart } from './overrides/en/miniCart';
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
  changeRequest,
  configureProduct,
  quoteReview,
  orderConfirmation,
};

export const fsOverrides: TranslationResources = {
  payment,
  miniCart,
};
