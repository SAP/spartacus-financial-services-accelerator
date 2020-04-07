export interface FormComponentMapping {
  component: any;
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

export abstract class DynamicFormsConfig {
  dynamicForms: {
    cssClass: CssClass;
    components: FormComponentConfig;
  };
}
