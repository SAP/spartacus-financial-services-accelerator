import * as fromUpload from './upload.action';

describe('loadUploads', () => {
  it('should return an action', () => {
    expect(fromUpload.UPLOAD_FILES).toBe('[Form Definition] Upload Documents');
  });
});
