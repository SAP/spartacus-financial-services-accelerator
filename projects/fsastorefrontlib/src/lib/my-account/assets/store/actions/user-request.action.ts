import { Action } from '@ngrx/store';

export const LOAD_USER_REQUEST = '[User Request] Load User Request';
export const LOAD_USER_REQUEST_SUCCESS =
  '[User Request] Load User Request Success';
export const LOAD_USER_REQUEST_FAIL = '[User Request] Load User Request Fail';

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

export type UserRequestAction =
  | LoadUserRequest
  | LoadUserRequestSuccess
  | LoadUserRequestFail;
