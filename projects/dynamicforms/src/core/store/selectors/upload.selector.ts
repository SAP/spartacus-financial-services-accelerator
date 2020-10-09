import { createSelector, MemoizedSelector } from '@ngrx/store';
import { FilesState, FormsState, StateWithForm } from '../state';
import { getFormState } from './feature.selector';

const uploadContent = (state: FilesState) => state.content;
const uploadLoaded = (state: FilesState) => state.loaded;

export const getUploadFilesState: MemoizedSelector<
  StateWithForm,
  FilesState
> = createSelector(getFormState, (state: FormsState) => state.uploadedFiles);

export const getUploadFiles: MemoizedSelector<
  StateWithForm,
  any
> = createSelector(getUploadFilesState, uploadContent);

export const getUploadFilesLoaded: MemoizedSelector<
  StateWithForm,
  any
> = createSelector(getUploadFilesState, uploadLoaded);
