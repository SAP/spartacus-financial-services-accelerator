import { createSelector, MemoizedSelector } from '@ngrx/store';
import { FilesState, FormsState, StateWithForm } from '../state';
import { getFormState } from './feature.selector';

const uploadContent = (state: FilesState) => state.content;

export const getUploadFilesState: MemoizedSelector<StateWithForm, FilesState> =
  createSelector(getFormState, (state: FormsState) => state.uploadedFiles);

export const getUploadFiles: MemoizedSelector<StateWithForm, any> =
  createSelector(getUploadFilesState, uploadContent);
