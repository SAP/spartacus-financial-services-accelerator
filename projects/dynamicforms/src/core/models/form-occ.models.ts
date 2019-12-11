import { FormDefinition } from 'dynamicforms/src/core';

export interface YFormData {
  id?: string;
  content?: string;
  type?: string;
  formDefinitionId?: string;
  formDefinition?: FormDefinition;
  categoryCode?: string;
  refId?: string;
}

export interface YFormDefinition {
  formId?: string;
  title?: string;
  content?: string;
}
