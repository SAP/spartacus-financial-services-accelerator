import { createSelector, MemoizedSelector } from '@ngrx/store';
import { UploadFilesState, FormsState, StateWithForm } from '../state';
import { getFormState } from './feature.selector';

const uploadContent = (state: UploadFilesState) => state.content;
const uploadLoaded = (state: UploadFilesState) => state.loaded;

export const getUploadFilesState: MemoizedSelector<
  StateWithForm,
  UploadFilesState
> = createSelector(getFormState, (state: FormsState) => state.uploadFiles);

export const getUploadFiles: MemoizedSelector<
  StateWithForm,
  any
> = createSelector(getUploadFilesState, uploadContent);

export const getUploadFilesLoaded: MemoizedSelector<
  StateWithForm,
  any
> = createSelector(getUploadFilesState, uploadLoaded);
