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

export abstract class FormConfig {
  cssClass?: CssClass;
}
