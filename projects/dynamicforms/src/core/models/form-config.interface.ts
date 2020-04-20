import { ValidatorFn } from '@angular/forms';

export interface FormDefinition {
  formGroups: DynamicFormGroup[];
  formId: string;
}
export interface DynamicFormGroup {
  groupCode?: string;
  fieldConfigs: FieldConfig[];
}
export interface FieldConfig {
  name?: string;
  required?: boolean;
  disabled?: boolean;
  group?: string;
  label?: TranslatableString;
  options?: FieldOption[];
  depends?: string[];
  jsonField?: string;
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[]; // TO-DO Remove validation attribute once all definitions are moved to back-end
  value?: any;
  hidden?: boolean;
  error?: TranslatableString;
  validations?: ValidatorFunction[];
}
export interface TranslatableString {
  default?: string;
  [key: string]: string;
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
