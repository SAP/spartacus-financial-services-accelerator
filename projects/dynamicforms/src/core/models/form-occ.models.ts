export interface YFormData {
  id?: string;
  content?: string;
  type?: string;
  formDefinition?: YFormDefinition;
  categoryCode?: string;
  refId?: string;
}

export interface YFormDefinition {
  formId?: string;
  title?: string;
  content?: string;
  applicationId?: string;
}

export interface YFormDefinitionList {
  formDefinitions: YFormDefinition[];
}

export interface DocumentFile extends File {
  code: string;
  createdByExternalSystem: boolean;
  creationTime: Date;
}
