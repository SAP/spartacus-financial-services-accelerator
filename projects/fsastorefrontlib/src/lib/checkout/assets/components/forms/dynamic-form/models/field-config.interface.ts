import { ValidatorFn } from '@angular/forms';

export interface FormDefinition {
  formGroups: FromGroup[];
  categoryCode: string;
  submitType: FormSubmitType;
}
export interface FromGroup {
  groupName: String;
  fieldConfigs: FieldConfig[];
}
export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  group?: string;
  name?: string;
  options?: string[];
  depends?: string[];
  jsonField?: string;
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[];
  value?: any;
  hidden?: boolean;
  error?: string;
}

export enum FormSubmitType {
  PRICING
}
