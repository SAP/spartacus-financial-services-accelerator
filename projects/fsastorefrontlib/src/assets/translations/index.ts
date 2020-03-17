import { TranslationResources } from '@spartacus/core';
import { b2b } from './en/b2b.en';
import { claim } from './en/claim.en';
import { fscommon } from './en/common.en';
import { forms } from './en/forms.en';
import { changeRequest } from './en/changeRequest.en';
import { policy } from './en/policy.en';
import { premiumCalendar } from './en/premiumCalendar.en';
import { quote } from './en/quote.en';
import { userRequest } from './en/userRequest.en';
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
};

export const fsOverrides: TranslationResources = {
  payment,
};
