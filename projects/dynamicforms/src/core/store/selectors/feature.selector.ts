import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  FormsState,
  FORM_FEATURE,
  StateWithForm,
} from '../form-definition-state';

export const getFormState: MemoizedSelector<
  StateWithForm,
  FormsState
> = createFeatureSelector<FormsState>(FORM_FEATURE);
