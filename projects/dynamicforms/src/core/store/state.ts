export const FORM_FEATURE = 'form';

export const FORM_DEFINITION_DATA = '[Form Definition] Form Definition Data';

export interface StateWithForm {
  [FORM_FEATURE]: FormsState;
}

export interface FormsState {
  formDefinition: FormDefinitionState;
  formData: FormDataState;
  uploadFiles: UploadFilesState;
}

export interface FormDefinitionState {
  loaded: boolean;
  content: {};
}

export interface FormDataState {
  loaded: boolean;
  content: {};
}

export interface UploadFilesState {
  loaded: boolean;
  content: {};
}
