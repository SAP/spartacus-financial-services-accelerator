import { Action } from '@ngrx/store';

export const LOAD_FORM_DATA = '[Form Data] Load Form Data';
export const LOAD_FORM_DATA_FAIL = '[Form Data] Load Form Data Fail';
export const LOAD_FORM_DATA_SUCCESS = '[Form Data] Load Form Data Success';

export const SAVE_FORM_DATA = '[Form Data] Save Form Data';
export const SAVE_FORM_DATA_FAIL = '[Form Data] Save Form Data Fail';
export const SAVE_FORM_DATA_SUCCESS = '[Form Data] Save Form Data Success';

export class LoadFormData implements Action {
  readonly type = LOAD_FORM_DATA;
  constructor(public payload: any) {}
}

export class LoadFormDataFail implements Action {
  readonly type = LOAD_FORM_DATA_FAIL;
  constructor(public payload: any) {}
}

export class LoadFormDataSuccess implements Action {
  readonly type = LOAD_FORM_DATA_SUCCESS;
  constructor(public payload: any) {}
}

export class SaveFormData implements Action {
  readonly type = SAVE_FORM_DATA;
  constructor(public payload: any) {}
}

export class SaveFormDataSuccess implements Action {
  readonly type = SAVE_FORM_DATA_SUCCESS;
  constructor(public payload: any) {}
}

export class SaveFormDataFail implements Action {
  readonly type = SAVE_FORM_DATA_FAIL;
  constructor(public payload: any) {}
}

export type FormDataAction =
  | LoadFormData
  | LoadFormDataFail
  | LoadFormDataSuccess
  | SaveFormData
  | SaveFormDataSuccess
  | SaveFormDataFail;
