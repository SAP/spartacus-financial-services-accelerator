import { createSelector, MemoizedSelector } from '@ngrx/store';
import { FormDataState, FormsState, StateWithForm } from '../state';
import { getFormState } from './feature.selector';

const formDataContent = (state: FormDataState) => state.content;
const formDataLoaded = (state: FormDataState) => state.loaded;

export const getFormDataState: MemoizedSelector<StateWithForm, FormDataState> =
  createSelector(getFormState, (state: FormsState) => state.formData);

export const getFormData: MemoizedSelector<StateWithForm, any> = createSelector(
  getFormDataState,
  formDataContent
);

export const getFormDataLoaded: MemoizedSelector<StateWithForm, any> =
  createSelector(getFormDataState, formDataLoaded);
