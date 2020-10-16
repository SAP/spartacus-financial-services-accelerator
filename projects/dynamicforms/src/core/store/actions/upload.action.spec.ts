import * as fromUpload from './upload.action';

describe('upload and reset files', () => {
  it('should return an upload action', () => {
    expect(fromUpload.UPLOAD_FILE_SUCCESS).toBe(
      '[Upload File] Upload file Success'
    );
  });
});
describe('upload and reset files', () => {
  it('should return an reset action', () => {
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
