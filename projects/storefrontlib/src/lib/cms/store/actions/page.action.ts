import { Action } from '@ngrx/store';

export const LOAD_PAGEDATA = '[Cms] Load PageData';
export const LOAD_PAGEDATA_FAIL = '[Cms] Load PageData Fail';
export const LOAD_PAGEDATA_SUCCESS = '[Cms] Load PageData Success';
export const UPDATE_LATEST_PAGE_KEY = '[Cms] Update latest page key';
export const CLEAN_PAGE_STATE = '[Cms] Clean Page State;';

export class LoadPageData implements Action {
  readonly type = LOAD_PAGEDATA;
  constructor(public payload: any) {}
}

export class LoadPageDataFail implements Action {
  readonly type = LOAD_PAGEDATA_FAIL;
  constructor(public payload: any) {}
}

export class LoadPageDataSuccess implements Action {
  readonly type = LOAD_PAGEDATA_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateLatestPageKey implements Action {
  readonly type = UPDATE_LATEST_PAGE_KEY;
  constructor(public payload: string) {}
}

export class CleanPageState implements Action {
  readonly type = CLEAN_PAGE_STATE;
  constructor() {}
}

// action types
export type PageAction =
  | LoadPageData
  | LoadPageDataFail
  | LoadPageDataSuccess
  | UpdateLatestPageKey
  | CleanPageState;
