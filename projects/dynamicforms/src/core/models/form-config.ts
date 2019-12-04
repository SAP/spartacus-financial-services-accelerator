export interface CssClass {
  formTitleClass?: string;
  inputWrapperClass?: string;
  labelClass?: string;
  inputClass?: string;
  radioInputWrapperClass?: string;
  radioInputClass?: string;
  radioLabelClass?: string;
  radioOptionLabelClass: string;
  validatorMessageWrapperClass?: string;
  validatorMessageClass?: string;
  submitButtonClass?: string;
}

export abstract class FormConfig {
  cssClass?: CssClass;
}
