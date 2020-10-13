import { Action } from '@ngrx/store';

export const UPLOAD_FILE_SUCCESS = '[Upload File] Upload file Success';

export class UploadFileSuccess implements Action {
  readonly type = UPLOAD_FILE_SUCCESS;
  constructor(public payload: any) {}
}

export type UploadFileAction = UploadFileSuccess;
