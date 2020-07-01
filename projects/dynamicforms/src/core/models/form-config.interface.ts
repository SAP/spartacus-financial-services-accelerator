export interface FormDefinition {
  formGroups: DynamicFormGroup[];
  formId: string;
  cssClass?: string;
}
export interface DynamicFormGroup {
  groupCode?: string;
  fieldConfigs: FieldConfig[];
  cssClass?: string;
  dependsOn?: DependsOn[];
}

export interface FieldConfig {
  name?: string;
  required?: boolean;
  disabled?: boolean;
  label?: LocalizedString;
  options?: FieldOption[];
  cssClass?: string;
  gridClass?: string;
  apiValue?: ApiConfig;
  placeholder?: string;
  fieldType: string;
  value?: any;
  hidden?: boolean;
  error?: LocalizedString;
  validations?: ValidatorFunction[];
  dependsOn?: DependsOn[];
  prefillValue?: PrefillValue;
}
export interface DependsOn {
  hide?: boolean;
  dependeciesArray?: ControlDependency[];
}
export interface ApiConfig {
  url: string;
  param?: string;
}

export interface PrefillValue {
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
  label: LocalizedString;
  selected?: boolean;
  icon?: string;
}
