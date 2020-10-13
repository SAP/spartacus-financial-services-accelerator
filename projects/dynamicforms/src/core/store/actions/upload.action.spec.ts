import * as fromUpload from './upload.action';

describe('loadUploads', () => {
  it('should return an action', () => {
    expect(fromUpload.UPLOAD_FILE_SUCCESS).toBe(
      '[Upload File] Upload file Success'
    );
  });
});
