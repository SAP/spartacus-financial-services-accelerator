import * as fromAction from '../actions';
import { FilesState } from '../state';

export const initialState: FilesState = {
  loaded: false,
  content: {
    files: [],
  },
};

export function reducer(
  state = initialState,
  action: fromAction.FileAction
): FilesState {
  switch (action.type) {
    case fromAction.UPLOAD_FILE_SUCCESS: {
      let content = { ...action.payload };
      const fileContent = { ...state.content };
      if (content?.body?.code) {
        fileContent.files = [...fileContent.files, content.body];
      }
      content = { ...fileContent };
      return {
        ...state,
        content,
        loaded: true,
      };
    }
    case fromAction.REMOVE_FILE_SUCCESS: {
      // needed to deep clone state.content object
      const fileContent = JSON.parse(JSON.stringify(state.content));
      const removedFileCode = action.payload;
      fileContent.files.forEach((file, index) => {
        if ((<any>file).code === removedFileCode) {
          fileContent.files.splice(index, 1);
        }
      });
      const content = { ...fileContent };
      return {
        ...state,
        content,
        loaded: true,
      };
    }
    case fromAction.SET_UPLOADED_FILES: {
      let content = { ...action.payload };
      const fileContent = { ...state.content };
      fileContent.files = content;
      content = { ...fileContent };
      return {
        ...state,
        content,
        loaded: true,
      };
    }
    case fromAction.RESET_FILE_SUCCESS: {
      state = initialState;
    }
  }
  return state;
}
export const getUploadFiles = (state: FilesState) => state.content;
