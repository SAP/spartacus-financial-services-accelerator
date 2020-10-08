import * as fromAction from '../actions';
import { UploadFilesState } from '../state';

export const initialState: UploadFilesState = {
  loaded: false,
  content: {},
};

export function reducer(
  state = initialState,
  action: fromAction.UploadFilesAction
): UploadFilesState {
  switch (action.type) {
    case fromAction.UPLOAD_FILES: {
      return {
        ...state,
        loaded: false,
      };
    }

    case fromAction.UPLOAD_FILES_SUCCESS: {
      const content = { ...action.payload };
      return {
        ...state,
        content,
        loaded: true,
      };
    }
  }
  return state;
}
export const getUploadFiles = (state: UploadFilesState) => state.content;
export const getLoaded = (state: UploadFilesState) => state.loaded;
