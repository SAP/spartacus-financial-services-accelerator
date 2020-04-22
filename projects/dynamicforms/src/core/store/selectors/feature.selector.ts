import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  FORM_DEFINITION_FEATURE,
  FormDefinitionsState,
  StateWithFormDefinition,
} from '../form-definition-state';

export const getFormDefinitionState: MemoizedSelector<
  StateWithFormDefinition,
  FormDefinitionsState
> = createFeatureSelector<FormDefinitionsState>(FORM_DEFINITION_FEATURE);
