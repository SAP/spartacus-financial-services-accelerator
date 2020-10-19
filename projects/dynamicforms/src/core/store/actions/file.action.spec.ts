import * as fromUpload from './file.action';

describe('File actions', () => {
  describe('UploadFileSuccess Action', () => {
    it('should create the action', () => {
      expect(fromUpload.UPLOAD_FILE_SUCCESS).toBe('[File] Upload file Success');
    });
  });
  describe('ResetFileSuccess Action', () => {
    it('should create the action', () => {
      const body = {
        files: [],
      };
      const action = new fromUpload.ResetFileSuccess(body);
      expect({ ...action }).toEqual({
        type: fromUpload.RESET_FILE_SUCCESS,
        payload: {
          files: [],
        },
      });
    });
  });
});
