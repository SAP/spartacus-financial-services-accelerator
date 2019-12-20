import { TranslationResources } from '@spartacus/core';
import { claim } from './en/claim.en';
import { fscommon } from './en/common.en';
import { forms } from './en/forms.en';
import { policy } from './en/policy.en';
import { premiumCalendar } from './en/premiumCalendar.en';
import { quote } from './en/quote.en';
import { userRequest } from './en/userRequest.en';
import { payment } from './overrides/en/payment';

export const fstranslations: TranslationResources = {
  claim,
  forms,
  fscommon,
  quote,
  policy,
  premiumCalendar,
  userRequest,
};

export const fsOverrides: TranslationResources = {
  payment,
};
