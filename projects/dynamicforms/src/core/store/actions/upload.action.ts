import { Action } from '@ngrx/store';

export const UPLOAD_FILE_SUCCESS = '[Upload File] Upload file Success';
export const RESET_FILE_SUCCESS = '[Upload File] Reset file Success';

export class UploadFileSuccess implements Action {
  readonly type = UPLOAD_FILE_SUCCESS;
  constructor(public payload: any) {}
}

export class ResetFileSuccess implements Action {
  readonly type = RESET_FILE_SUCCESS;
  constructor(public payload: any) {}
}

export type UploadFileAction = UploadFileSuccess | ResetFileSuccess;
