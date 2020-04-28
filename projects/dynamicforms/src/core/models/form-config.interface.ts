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
  dependsOn?: ControlDependency[];
}

export interface FieldConfig {
  name?: string;
  required?: boolean;
  disabled?: boolean;
  group?: string;
  label?: LocalizedString;
  options?: FieldOption[];
  cssClass?: string;
  gridClass?: string;
  depends?: string[];
  apiUrl?: string;
  placeholder?: string;
  type: string;
  value?: any;
  hidden?: boolean;
  prefilValue?: PrefilValue;
  error?: LocalizedString;
  validations?: ValidatorFunction[];
  dependsOn?: ControlDependency[];
}

export interface PrefilValue {
  targetObject: string;
  targetValue: string;
}

export interface ControlDependency {
  controlName?: string;
  conditions?: ValidatorFunction[];
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
