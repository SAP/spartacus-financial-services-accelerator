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
  disabled?: boolean;
  label?: string;
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
  value: string;
}

export interface FieldOption {
  name: string;
  label: string;
  icon?: string;
}
