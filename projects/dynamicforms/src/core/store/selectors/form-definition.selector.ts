import { createSelector, MemoizedSelector } from '@ngrx/store';
import { FormDefinitionState, FormsState, StateWithForm } from '../state';
import { getFormState } from './feature.selector';

const formDefinitionContent = (state: FormDefinitionState) => state.content;
const formDefinitionLoaded = (state: FormDefinitionState) => state.loaded;

export const getFormDefinitionState: MemoizedSelector<
  StateWithForm,
  FormDefinitionState
> = createSelector(getFormState, (state: FormsState) => state.formDefinition);

export const getFormDefinition: MemoizedSelector<StateWithForm, any> =
  createSelector(getFormDefinitionState, formDefinitionContent);

export const getFormDefinitionLoaded: MemoizedSelector<StateWithForm, any> =
  createSelector(getFormDefinitionState, formDefinitionLoaded);
