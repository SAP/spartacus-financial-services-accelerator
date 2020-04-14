export interface FormComponentMapping {
  component: any;
  cssEntries?: ComponentCss;
}

export interface ComponentCss {
  wrapperClass?: string;
  labelClass?: string;
  optionalClass?: string;
  elementClass?: string;
}

export abstract class FormComponentConfig {
  [_: string]: FormComponentMapping;
}

export interface CssClass {
  form?: string;
  controlElement?: string;
  formTitle?: string;
  inputWrapper?: string;
  label?: string;
  input?: string;
  radioInputWrapper?: string;
  radioInput?: string;
  radioLabel?: string;
  radioOptionLabel?: string;
  validatorMessageWrapper?: string;
  validatorMessage?: string;
  submitButton?: string;
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
    cssClass?: CssClass;
    components?: FormComponentConfig;
    validators?: ValidatorConfig;
  };
}
