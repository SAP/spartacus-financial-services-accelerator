export interface YFormData {
  id?: string;
  content?: string;
  type?: string;
  formDefinition?: YFormDefinition;
  currency?: string;
  categoryCode?: string;
  refId?: string;
}

export interface YFormDefinition {
  formId?: string;
  title?: string;
  content?: string;
  applicationId?: string;
}
