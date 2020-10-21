import * as fromAction from '../actions';
import * as fromReducer from './file.reducer';

const mockFile = {
  code: '00007011',
  downloadUrl: '/medias/testFile1.pdf',
};

const mockContent = {
  files: [],
  body: mockFile,
};

const { initialState } = fromReducer;

describe('File Upload Reducer', () => {
  describe('UPLOAD_FILE_SUCCESS', () => {
    it('should upload file success', () => {
      const createSuccess = new fromAction.UploadFileSuccess(mockContent);
      const finalState = fromReducer.reducer(initialState, createSuccess);
      expect(finalState.content.files.length).toEqual(1);
    });
  });
  describe('RESET_FILE_SUCCESS', () => {
    it('should reset the state to initial', () => {
      const resetSuccess = new fromAction.ResetFileSuccess({});
      const finalState = fromReducer.reducer(initialState, resetSuccess);
      expect(finalState).toEqual(initialState);
    });
  });
  describe('REMOVE_FILE_SUCCESS', () => {
    it('should remove file from current state', () => {
      const createSuccess = new fromAction.UploadFileSuccess(mockContent);
      const createState = fromReducer.reducer(initialState, createSuccess);

      const removeSuccess = new fromAction.RemoveFileSuccess(mockFile.code);
      const removeState = fromReducer.reducer(createState, removeSuccess);
      expect(removeState.content.files.length).toEqual(0);
    });
  });
});
