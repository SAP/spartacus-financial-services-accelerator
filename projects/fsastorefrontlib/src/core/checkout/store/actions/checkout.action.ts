import { Action } from '@ngrx/store';

export const SET_IDENTIFICATION_TYPE = '[Cart] Set Identification Type';
export const SET_IDENTIFICATION_TYPE_SUCCESS =
  '[Cart] Set Identification Type Success';
export const SET_IDENTIFICATION_TYPE_FAIL =
  '[Cart] Set Identification Type Fail';

export class SetIdentificationType implements Action {
  readonly type = SET_IDENTIFICATION_TYPE;
  constructor(public payload: any) {}
}

export class SetIdentificationTypeSuccess implements Action {
  readonly type = SET_IDENTIFICATION_TYPE_SUCCESS;
  constructor(public payload: any) {}
}

export class SetIdentificationTypeFail implements Action {
  readonly type = SET_IDENTIFICATION_TYPE_FAIL;
  constructor(public payload: any) {}
}

export type CheckoutAction =
  | SetIdentificationType
  | SetIdentificationTypeSuccess
  | SetIdentificationTypeFail;
