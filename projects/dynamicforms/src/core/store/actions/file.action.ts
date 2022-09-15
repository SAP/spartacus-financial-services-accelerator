import { Action } from '@ngrx/store';

export const UPLOAD_FILE_SUCCESS = '[File] Upload file Success';
export const RESET_FILE_SUCCESS = '[File] Reset file Success';
export const REMOVE_FILE = '[File] Remove File';
export const REMOVE_FILE_SUCCESS = '[File] Remove File Success';
export const REMOVE_FILE_FAIL = '[File] Remove File Fail';
export const SET_UPLOADED_FILES = '[File] Set Uploaded Files';

export class UploadFileSuccess implements Action {
  readonly type = UPLOAD_FILE_SUCCESS;
  constructor(public payload: any) {}
}

export class ResetFileSuccess implements Action {
  readonly type = RESET_FILE_SUCCESS;
  constructor(public payload: any) {}
}

export class RemoveFile implements Action {
  readonly type = REMOVE_FILE;
  constructor(public payload: any) {}
}

export class RemoveFileSuccess implements Action {
  readonly type = REMOVE_FILE_SUCCESS;
  constructor(public payload: any) {}
}

export class RemoveFileFail implements Action {
  readonly type = REMOVE_FILE_FAIL;
  constructor(public payload: any) {}
}

export class SetUploadedFiles implements Action {
  readonly type = SET_UPLOADED_FILES;
  constructor(public payload: any) {}
}

export type FileAction =
  | UploadFileSuccess
  | ResetFileSuccess
  | RemoveFile
  | RemoveFileSuccess
  | RemoveFileFail
  | SetUploadedFiles;
