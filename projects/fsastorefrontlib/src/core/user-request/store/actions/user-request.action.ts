import { Action } from '@ngrx/store';

export const LOAD_USER_REQUEST = '[User Request] Load User Request';
export const LOAD_USER_REQUEST_SUCCESS =
  '[User Request] Load User Request Success';
export const LOAD_USER_REQUEST_FAIL = '[User Request] Load User Request Fail';

export const UPDATE_USER_REQUEST = '[User Request] Update User Request';
export const UPDATE_USER_REQUEST_SUCCESS =
  '[User Request] Update User Request Success';
export const UPDATE_USER_REQUEST_FAIL =
  '[User Request] Update User Request Fail';


export class LoadUserRequest implements Action {
  readonly type = LOAD_USER_REQUEST;
  constructor(public payload: any) {}
}

export class LoadUserRequestSuccess implements Action {
  readonly type = LOAD_USER_REQUEST_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadUserRequestFail implements Action {
  readonly type = LOAD_USER_REQUEST_FAIL;
  constructor(public payload: any) {}
}

export class UpdateUserRequest implements Action {
  readonly type = UPDATE_USER_REQUEST;
  constructor(public payload: any) {}
}

export class UpdateUserRequestSuccess implements Action {
  readonly type = UPDATE_USER_REQUEST_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateUserRequestFail implements Action {
  readonly type = UPDATE_USER_REQUEST_FAIL;
  constructor(public payload: any) {}
}

export type UserRequestAction =
  | LoadUserRequest
  | LoadUserRequestSuccess
  | LoadUserRequestFail
  | UpdateUserRequest
  | UpdateUserRequestSuccess
  | UpdateUserRequestFail;
