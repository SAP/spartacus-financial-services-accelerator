import { Action } from '@ngrx/store';
export const LOAD_CONSENTS = '[Consent] Load Consents';
export const LOAD_CONSENTS_SUCCESS = '[Consent] Load Consents Success';
export const LOAD_CONSENTS_FAIL = '[Consent] Load Consents Fail';


export const TRANSFER_CART = '[Consent] Transfer Cart';
export const TRANSFER_CART_SUCCESS = '[Consent] Transfer Cart Success';
export const TRANSFER_CART_FAIL = '[Consent] Transfer Cart Fail';

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

export class TransferCart implements Action {
  readonly type = TRANSFER_CART;
  constructor(public payload: any) {}
}

export class TransferCartSuccess implements Action {
  readonly type = TRANSFER_CART_SUCCESS;
  constructor() {}
}

export class TransferCartFail implements Action {
  readonly type = TRANSFER_CART_SUCCESS;
  constructor(public payload: any) {}
}

export type ConsentAction =
  | LoadConsents
  | LoadConsentsSuccess
  | LoadConsentsFail
  | TransferCart
  | TransferCartSuccess
  | TransferCartFail;
