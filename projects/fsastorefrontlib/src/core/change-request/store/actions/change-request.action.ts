import { Action } from '@ngrx/store';

export const LOAD_CHANGE_REQUEST = '[Change Request] Load Change Request';
export const LOAD_CHANGE_REQUEST_FAIL =
  '[Change Request] Load Change Request Fail';
export const LOAD_CHANGE_REQUEST_SUCCESS =
  '[Change Request] Load Change Request Success';

export const CREATE_CHANGE_REQUEST = '[Change Request] Create Change Request';
export const CREATE_CHANGE_REQUEST_FAIL =
  '[Change Request] Create Change Request Fail';
export const CREATE_CHANGE_REQUEST_SUCCESS =
  '[Change Request] Create Change Request Success';

export class CreateChangeRequest implements Action {
  readonly type = CREATE_CHANGE_REQUEST;
  constructor(public payload: any) {}
}

export class CreateChangeRequestFail implements Action {
  readonly type = CREATE_CHANGE_REQUEST_FAIL;
  constructor(public payload: any) {}
}

export class CreateChangeRequestSuccess implements Action {
  readonly type = CREATE_CHANGE_REQUEST_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadChangeRequest implements Action {
  readonly type = LOAD_CHANGE_REQUEST;
  constructor(public payload: any) {}
}

export class LoadChangeRequestFail implements Action {
  readonly type = LOAD_CHANGE_REQUEST_FAIL;
  constructor(public payload: any) {}
}

export class LoadChangeRequestSuccess implements Action {
  readonly type = LOAD_CHANGE_REQUEST_SUCCESS;
  constructor(public payload: any) {}
}

export type ChangeRequestAction =
  | CreateChangeRequest
  | CreateChangeRequestFail
  | CreateChangeRequestSuccess
  | LoadChangeRequest
  | LoadChangeRequestFail
  | LoadChangeRequestSuccess;
