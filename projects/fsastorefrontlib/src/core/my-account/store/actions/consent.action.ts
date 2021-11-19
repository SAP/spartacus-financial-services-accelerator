import { Action } from '@ngrx/store';
export const LOAD_CONSENTS = '[Consent] Load Consents';
export const LOAD_CONSENTS_SUCCESS = '[Consent] Load Consents Success';
export const LOAD_CONSENTS_FAIL = '[Consent] Load Consents Fail';

export class LoadConsents implements Action {
  readonly type = LOAD_CONSENTS;
  constructor(public payload: any) {}
}

export class LoadConsentsSuccess implements Action {
  readonly type = LOAD_CONSENTS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadConsentsFail implements Action {
  readonly type = LOAD_CONSENTS_FAIL;
  constructor(public payload: any) {}
}

export type ConsentAction =
  | LoadConsents
  | LoadConsentsSuccess
  | LoadConsentsFail;
