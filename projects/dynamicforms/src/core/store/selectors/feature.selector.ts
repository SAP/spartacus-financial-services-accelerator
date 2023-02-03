import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import { FormsState, FORM_FEATURE, StateWithForm } from '../state';

export const getFormState: MemoizedSelector<StateWithForm, FormsState> =
  createFeatureSelector<FormsState>(FORM_FEATURE);
