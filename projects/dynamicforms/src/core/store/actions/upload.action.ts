import { Action } from '@ngrx/store';

export const UPLOAD_FILE = '[Upload File] Upload file';
export const UPLOAD_FILE_FAIL = '[Upload File] Upload file Fail';
export const UPLOAD_FILE_SUCCESS = '[Upload File] Upload file Success';

export class UploadFile implements Action {
  readonly type = UPLOAD_FILE;
  constructor(public payload: any) {}
}

export class UploadFileFail implements Action {
  readonly type = UPLOAD_FILE_FAIL;
  constructor(public payload: any) {}
}

export class UploadFileSuccess implements Action {
  readonly type = UPLOAD_FILE_SUCCESS;
  constructor(public payload: any) {}
}

export type UploadFileAction = UploadFile | UploadFileFail | UploadFileSuccess;
