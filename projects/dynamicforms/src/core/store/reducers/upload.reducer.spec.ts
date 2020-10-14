import * as fromAction from '../actions';
import * as fromReducer from './upload.reducer';

const blob1 = new Blob([''], { type: 'application/pdf' });
blob1['lastModifiedDate'] = '';
blob1['name'] = 'testFile1';
const mockFile = <File>blob1;

const mockFiles = {
  files: [mockFile],
};

const mockHttpResponse = {
  content: {
    files: [mockFile],
    body: {
      code: '00007011',
      downloadUrl: '/medias/testFile1.pdf',
    },
  },
};

const { initialState } = fromReducer;

describe('Form Definition Reducer', () => {
  describe('UPLOAD_FILE_SUCCESS', () => {
    it('should upload file success', () => {
      const action = {} as fromAction.UploadFileAction;
      const state = fromReducer.reducer(initialState, action);
      const createSuccess = new fromAction.UploadFileSuccess(mockFiles);
      const finalState = fromReducer.reducer(state, createSuccess);
      console.log(state, finalState);
      expect(finalState.content).toEqual(mockHttpResponse.content);
      expect(finalState.loaded).toEqual(true);
    });
  });
});
