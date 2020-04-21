import { LoaderState } from '@spartacus/core';

export const FORM_DEFINITION_FEATURE = 'formDefinition';

export const FORM_DEFINITION_DATA = '[Form Definition] Form Definition Data';

export interface StateWithFormDefinition {
  [FORM_DEFINITION_FEATURE]: FormDefinitionsState;
}

export interface FormDefinitionsState {
  formDefinition: LoaderState<FormDefinitionState>;
}

export interface FormDefinitionState {
  loaded: boolean;
  content: {};
}
