import { StateUtils } from '@spartacus/core';
import { CHANGE_REQUEST_DATA } from '../change-request-state';

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

export const SIMULATE_CHANGE_REQUEST =
  '[Change Request] Simulate Change Request';
export const SIMULATE_CHANGE_REQUEST_FAIL =
  '[Change Request] Simulate Change Request Fail';
export const SIMULATE_CHANGE_REQUEST_SUCCESS =
  '[Change Request] Simulate Change Request Success';

export const CANCEL_CHANGE_REQUEST = '[Change Request] Cancel Change Request';
export const CANCEL_CHANGE_REQUEST_FAIL =
  '[Change Request] Cancel Change Request Fail';
export const CANCEL_CHANGE_REQUEST_SUCCESS =
  '[Change Request] Cancel Change Request Success';

export const SUBMIT_CHANGE_REQUEST = '[Change Request] Submit Change Request';
export const SUBMIT_CHANGE_REQUEST_FAIL =
  '[Change Request] Submit Change Request Fail';
export const SUBMIT_CHANGE_REQUEST_SUCCESS =
  '[Change Request] Submit Change Request Success';

export const UPDATE_CHANGE_REQUEST = '[Change Request] Update Change Request';
export const UPDATE_CHANGE_REQUEST_FAIL =
  '[Change Request] Update Change Request Fail';
export const UPDATE_CHANGE_REQUEST_SUCCESS =
  '[Change Request] Update Change Request Success';

export class CreateChangeRequest extends StateUtils.LoaderLoadAction {
  readonly type = CREATE_CHANGE_REQUEST;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class CreateChangeRequestFail extends StateUtils.LoaderFailAction {
  readonly type = CREATE_CHANGE_REQUEST_FAIL;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA, payload);
  }
}

export class CreateChangeRequestSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = CREATE_CHANGE_REQUEST_SUCCESS;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class LoadChangeRequest extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_CHANGE_REQUEST;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class LoadChangeRequestFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_CHANGE_REQUEST_FAIL;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA, payload);
  }
}

export class LoadChangeRequestSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_CHANGE_REQUEST_SUCCESS;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class SimulateChangeRequest extends StateUtils.LoaderLoadAction {
  readonly type = SIMULATE_CHANGE_REQUEST;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class SimulateChangeRequestFail extends StateUtils.LoaderFailAction {
  readonly type = SIMULATE_CHANGE_REQUEST_FAIL;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA, payload);
  }
}

export class SimulateChangeRequestSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = SIMULATE_CHANGE_REQUEST_SUCCESS;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class CancelChangeRequest extends StateUtils.LoaderLoadAction {
  readonly type = CANCEL_CHANGE_REQUEST;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class CancelChangeRequestSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = CANCEL_CHANGE_REQUEST_SUCCESS;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class CancelChangeRequestFail extends StateUtils.LoaderFailAction {
  readonly type = CANCEL_CHANGE_REQUEST_FAIL;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA, payload);
  }
}

export class UpdateChangeRequest extends StateUtils.LoaderLoadAction {
  readonly type = UPDATE_CHANGE_REQUEST;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class UpdateChangeRequestFail extends StateUtils.LoaderFailAction {
  readonly type = UPDATE_CHANGE_REQUEST_FAIL;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA, payload);
  }
}

export class UpdateChangeRequestSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = UPDATE_CHANGE_REQUEST_SUCCESS;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class SubmitChangeRequest extends StateUtils.LoaderLoadAction {
  readonly type = SUBMIT_CHANGE_REQUEST;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export class SubmitChangeRequestFail extends StateUtils.LoaderFailAction {
  readonly type = SUBMIT_CHANGE_REQUEST_FAIL;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA, payload);
  }
}

export class SubmitChangeRequestSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = SUBMIT_CHANGE_REQUEST_SUCCESS;
  constructor(public payload: any) {
    super(CHANGE_REQUEST_DATA);
  }
}

export type ChangeRequestAction =
  | CreateChangeRequest
  | CreateChangeRequestFail
  | CreateChangeRequestSuccess
  | LoadChangeRequest
  | LoadChangeRequestFail
  | LoadChangeRequestSuccess
  | SimulateChangeRequest
  | SimulateChangeRequestFail
  | SimulateChangeRequestSuccess
  | CancelChangeRequest
  | CancelChangeRequestSuccess
  | CancelChangeRequestFail
  | UpdateChangeRequest
  | UpdateChangeRequestSuccess
  | UpdateChangeRequestFail
  | SubmitChangeRequest
  | SubmitChangeRequestSuccess
  | SubmitChangeRequestFail;
