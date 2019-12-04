export interface FormComponentMapping {
  component: any;
}

export abstract class FormComponentConfig {
  [_: string]: FormComponentMapping;
}

export interface ValidationMapping {
  function: any;
}

export abstract class ValidationConfig {
  [_: string]: ValidationMapping;
}

export interface CssClasses {
  inputWrapperClasses?: string;
  labelClasses?: string;
  inputClasses?: string;
  radioInputWrapperClasses?: string;
  radioInputClasses?: string;
  radioLabelClasses?: string;
  radioOptionLabelClasses: string;
  submitButtonClasses?: string;
  validatorMessageWrapperClasses?: string;
  validatorMessageClasses?: string;
  formTitleClasses?: string;
}

export abstract class FormConfig {
  components: FormComponentConfig;
  validations?: ValidationConfig;
  cssClasess?: CssClasses;
}
