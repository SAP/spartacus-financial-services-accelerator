import { ValidatorFn } from '@angular/forms';

export interface FormDefinition {
  formGroups: DynamicFormGroup[];
  formId: string;
  cssClass?: string;
}
export interface DynamicFormGroup {
  groupCode?: string;
  fieldConfigs: FieldConfig[];
  cssClass?: string;
}
export interface FieldConfig {
  name?: string;
  required?: boolean;
  disabled?: boolean;
  group?: string;
  label?: LocalizedString;
  options?: FieldOption[];
  cssClass?: string;
  depends?: string[];
  apiUrl?: string;
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[]; // TO-DO Remove validation attribute once all definitions are moved to back-end
  value?: any;
  hidden?: boolean;
  error?: LocalizedString;
  validations?: ValidatorFunction[];
}
export interface LocalizedString {
  default?: string;
  [lang: string]: string;
}
export interface ValidatorFunction {
  name: string;
  arguments?: ValidatorArgument[];
}
export interface ValidatorArgument {
  value: string;
}
export interface FieldOption {
  name: string;
  label: string;
  icon?: string;
}
