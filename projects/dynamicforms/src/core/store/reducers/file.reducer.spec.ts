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
});
