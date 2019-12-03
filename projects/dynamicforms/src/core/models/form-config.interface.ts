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
  group?: string;
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
}

export interface FieldOption {
  name: string;
  label: string;
  icon?: string;
}

export interface CategoryFormRelationMapping {
  categoryCode: string;
  chooseCoverFormId?: string;
  personalDetailsFormId?: string;
}
