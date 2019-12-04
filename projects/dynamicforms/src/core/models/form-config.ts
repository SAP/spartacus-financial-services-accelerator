export interface CssClasses {
  formTitleClasses?: string;
  inputWrapperClasses?: string;
  labelClasses?: string;
  inputClasses?: string;
  radioInputWrapperClasses?: string;
  radioInputClasses?: string;
  radioLabelClasses?: string;
  radioOptionLabelClasses: string;
  validatorMessageWrapperClasses?: string;
  validatorMessageClasses?: string;
  submitButtonClasses?: string;
}

export abstract class FormConfig {
  cssClasess?: CssClasses;
}
