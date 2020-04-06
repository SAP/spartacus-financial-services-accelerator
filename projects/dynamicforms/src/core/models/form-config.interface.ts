import { ValidatorFn } from '@angular/forms';

export interface FormDefinition {
  formGroups: FromGroup[];
  formId: string;
}
export interface FromGroup {
  groupCode?: String;
  fieldConfigs: FieldConfig[];
}
export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  group?: FromGroup;
  name?: string;
  options?: FieldOption[];
  depends?: string[];
  jsonField?: string;
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[];
  value?: any;
  hidden?: boolean;
  error?: string;
  validations?: ValidatorFunction[];
}

export interface ValidatorFunction {
  name: string;
  args?: ValidationArgument[];
}

export interface ValidationArgument {
  name: string;
}

export interface FieldOption {
  name: string;
  label: string;
  icon?: string;
}
