import { AbstractControl, ValidatorFn } from '@angular/forms';

export interface FormDefinition {
  formGroups: DynamicFormGroup[];
  formId: string;
}
export interface DynamicFormGroup {
  groupCode?: string;
  fieldConfigs: FieldConfig[];
  dependsOn?: DependencyFn[];
}

export interface FieldConfig {
  name?: string;
  required?: boolean;
  disabled?: boolean;
  group?: string;
  label?: string;
  options?: FieldOption[];
  depends?: string[];
  jsonField?: string;
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[]; // TO-DO Remove validation attribute once all definitions are moved to back-end
  value?: any;
  hidden?: boolean;
  error?: string;
  validations?: ValidatorFunction[];
  dependsOn?: DependencyFn[];
}

export interface DependencyFn {
  (control: AbstractControl);
  name?: string;
  conditions?: ValidatorFunction[];
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
