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

export interface PrefilMapping {
  prefilResolver: any;
}

export abstract class PrefilConfig {
  [_: string]: PrefilMapping;
}

export abstract class DynamicFormsConfig {
  dynamicForms: {
    components?: FormComponentConfig;
    validators?: ValidatorConfig;
    prefil?: PrefilConfig;
  };
}
