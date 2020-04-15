export interface FormComponentMapping {
  component: any;
  cssEntries?: ComponentCss;
}

export interface ComponentCss {
  wrapperClass?: string;
  labelClass?: string;
  optionalClass?: string;
  elementClass?: string;
  errorWrapperClass?: string;
  errorClass?: string;
  errorMessageClass?: string;
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
    components?: FormComponentConfig;
    validators?: ValidatorConfig;
  };
}
