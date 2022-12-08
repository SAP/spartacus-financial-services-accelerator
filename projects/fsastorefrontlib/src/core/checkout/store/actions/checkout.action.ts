import { Action } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';

export const SET_IDENTIFICATION_TYPE = '[FSCheckout] Set Identification Type';
export const SET_IDENTIFICATION_TYPE_SUCCESS =
  '[FSCheckout] Set Identification Type Success';
export const SET_IDENTIFICATION_TYPE_FAIL =
  '[FSCheckout] Set Identification Type Fail';
export const SET_LEGAL_INFORMATION_SUCCESS =
  '[FSCheckout] Set Legal Information Success';
export const SET_PAYMENT_TYPE_SUCCESS = '[FSCheckout] Set Payment Type Success';

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

export class SetLegalInformationSuccess implements Action {
  readonly type = SET_LEGAL_INFORMATION_SUCCESS;
  constructor(public payload: any) {}
}

export class SetPaymentTypeSuccess implements Action {
  readonly type = SET_PAYMENT_TYPE_SUCCESS;
  constructor(public payload: any) {}
}

export type CheckoutAction =
  | SetIdentificationType
  | SetIdentificationTypeSuccess
  | SetIdentificationTypeFail
  | SetLegalInformationSuccess
  | SetPaymentTypeSuccess;
