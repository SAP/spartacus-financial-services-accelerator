import { ValidatorFn } from '@angular/forms';

export interface FormDefinition {
  formGroups: FromGroup[];
  categoryCode: string;
}
export interface FromGroup {
  groupName: String;
  priceAttributes: FieldConfig[];
}
export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  name?: string;
  options?: string[];
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[];
  value?: any;
  hidden?: boolean;
}
