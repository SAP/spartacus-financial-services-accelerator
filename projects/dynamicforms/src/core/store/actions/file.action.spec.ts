import * as fromUpload from './file.action';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';

describe('upload and reset files', () => {
  it('should return an upload action', () => {
    expect(fromUpload.UPLOAD_FILE_SUCCESS).toBe('[File] Upload file Success');
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
describe('RemoveFile', () => {
  it('should create the action', () => {
    const payload = { user: OCC_USER_ID_CURRENT, fileCode: 'testFileCode' };
    const action = new fromUpload.RemoveFile(payload);
    expect({ ...action }).toEqual({
      type: fromUpload.REMOVE_FILE,
      payload,
    });
  });
});

describe('RemoveFileSuccess', () => {
  it('should create the action', () => {
    const payload = { fileCode: 'testFileCode' };
    const action = new fromUpload.RemoveFileSuccess(payload);
    expect({ ...action }).toEqual({
      type: fromUpload.REMOVE_FILE_SUCCESS,
      payload,
    });
  });
});

describe('RemoveFileFail', () => {
  it('should create the action', () => {
    const payload = JSON.stringify('error');
    const action = new fromUpload.RemoveFileFail(payload);
    expect({ ...action }).toEqual({
      type: fromUpload.REMOVE_FILE_FAIL,
      payload,
    });
  });
});
