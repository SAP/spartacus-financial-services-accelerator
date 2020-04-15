export interface FormComponentMapping {
  component: any;
  cssEntries?: {
    wrapperClass?: string;
    labelClass?: string;
    optionalClass?: string;
    elementClass?: string;
  };
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

export abstract class DynamicFormsConfig {
  dynamicForms: {
    formClass?: string;
    errorWrapperClass?: string;
    errorClass?: string;
    errorMessageClass?: string;
    components?: FormComponentConfig;
    validators?: ValidatorConfig;
  };
}
