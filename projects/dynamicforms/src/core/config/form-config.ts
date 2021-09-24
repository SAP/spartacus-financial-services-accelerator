import { Config } from '@spartacus/core';

export interface FormComponentMapping {
  component: any;
}

export abstract class FormComponentConfig {
  [_: string]: FormComponentMapping;
}

export interface ValidatorMapping {
  validator: any;
}

export abstract class ValidatorConfig {
  [_: string]: ValidatorMapping;
}
export interface PrefillMapping {
  prefillResolver: any;
}

export abstract class PrefillConfig {
  [_: string]: PrefillMapping;
}

export abstract class DynamicFormsConfig extends Config {
  dynamicForms: {
    components?: FormComponentConfig;
    validators?: ValidatorConfig;
    prefill?: PrefillConfig;
  };
}
