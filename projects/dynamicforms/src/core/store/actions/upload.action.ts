import { Action } from '@ngrx/store';

export const UPLOAD_FILES = '[Upload Files] Upload files';
export const UPLOAD_FILES_FAIL = '[Upload Files] Upload files Fail';
export const UPLOAD_FILES_SUCCESS = '[Upload Files] Upload files Success';

export class UploadFiles implements Action {
  readonly type = UPLOAD_FILES;
  constructor(public payload: any) {}
}

export class UploadFilesFail implements Action {
  readonly type = UPLOAD_FILES_FAIL;
  constructor(public payload: any) {}
}

export class UploadFilesSuccess implements Action {
  readonly type = UPLOAD_FILES_SUCCESS;
  constructor(public payload: any) {}
}

export type UploadFilesAction =
  | UploadFiles
  | UploadFilesFail
  | UploadFilesSuccess;
