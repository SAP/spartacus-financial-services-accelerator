import { Action } from '@ngrx/store';
import { CartActions } from '@spartacus/cart/base/core';
export const LOAD_CONSENTS = '[Consent] Load Consents';
export const LOAD_CONSENTS_SUCCESS = '[Consent] Load Consents Success';
export const LOAD_CONSENTS_FAIL = '[Consent] Load Consents Fail';
export const LOAD_CUSTOMER = '[Consent] Load Customer';
export const LOAD_CUSTOMER_SUCCESS = '[Consent] Load Customer Success';
export const LOAD_CUSTOMER_FAIL = '[Consent] Load Customer Fail';
export const LOAD_CUSTOMER_ASSETS = '[Consent] Load Customer Quotes';
export const LOAD_CUSTOMER_ASSETS_SUCCESS =
  '[Consent] Load Customer Quotes Success';
export const LOAD_CUSTOMER_ASSETS_FAIL = '[Consent] Load Customer Quotes Fail';
export const LOAD_CUSTOMER_QUOTES = '[Consent] Load Customer Quotes';
export const LOAD_CUSTOMER_QUOTES_SUCCESS =
  '[Consent] Load Customer Quotes Success';
export const LOAD_CUSTOMER_QUOTES_FAIL = '[Consent] Load Customer Quotes Fail';
export const LOAD_CUSTOMER_POLICIES = '[Consent] Load Customer Policies';
export const LOAD_CUSTOMER_POLICIES_SUCCESS =
  '[Consent] Load Customer Policies Success';
export const LOAD_CUSTOMER_POLICIES_FAIL =
  '[Consent] Load Customer Policies Fail';
export const LOAD_CUSTOMER_CLAIMS = '[Consent] Load Customer Claims';
export const LOAD_CUSTOMER_CLAIMS_SUCCESS =
  '[Consent] Load Customer Claims Success';
export const LOAD_CUSTOMER_CLAIMS_FAIL = '[Consent] Load Customer Claims Fail';

export const TRANSFER_CART = '[Consent] Transfer Cart';
export const TRANSFER_CART_SUCCESS = '[Consent] Transfer Cart Success';
export const TRANSFER_CART_FAIL = '[Consent] Transfer Cart Fail';

export const CREATE_ADDRESS = '[Consent] Create Cart';
export const CREATE_ADDRESS_SUCCESS = '[Consent] Create Cart Success';
export const CREATE_ADDRESS_FAIL = '[Consent] Create Cart Fail';

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

export class LoadCustomer implements Action {
  readonly type = LOAD_CUSTOMER;
  constructor(public payload: any) {}
}

export class LoadCustomerSuccess implements Action {
  readonly type = LOAD_CUSTOMER_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadCustomerFail implements Action {
  readonly type = LOAD_CUSTOMER_FAIL;
  constructor(public payload: any) {}
}

export class LoadCustomerQuotes implements Action {
  readonly type = LOAD_CUSTOMER_QUOTES;
  constructor(public payload: any) {}
}

export class LoadCustomerQuotesSuccess implements Action {
  readonly type = LOAD_CUSTOMER_QUOTES_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadCustomerQuotesFail implements Action {
  readonly type = LOAD_CUSTOMER_QUOTES_FAIL;
  constructor(public payload: any) {}
}

export class LoadCustomerPolicies implements Action {
  readonly type = LOAD_CUSTOMER_POLICIES;
  constructor(public payload: any) {}
}

export class LoadCustomerPoliciesSuccess implements Action {
  readonly type = LOAD_CUSTOMER_POLICIES_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadCustomerPoliciesFail implements Action {
  readonly type = LOAD_CUSTOMER_POLICIES_FAIL;
  constructor(public payload: any) {}
}

export class LoadCustomerClaims implements Action {
  readonly type = LOAD_CUSTOMER_CLAIMS;
  constructor(public payload: any) {}
}

export class LoadCustomerClaimsSuccess implements Action {
  readonly type = LOAD_CUSTOMER_CLAIMS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadCustomerClaimsFail implements Action {
  readonly type = LOAD_CUSTOMER_CLAIMS_FAIL;
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
  readonly type = TRANSFER_CART_FAIL;
  constructor(public payload: any) {}
}

export class CreateAddress implements Action {
  readonly type = CREATE_ADDRESS;
  constructor(public payload: any) {}
}

export class CreateAddressSuccess implements Action {
  readonly type = CREATE_ADDRESS_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateAddressFail implements Action {
  readonly type = CREATE_ADDRESS_FAIL;
  constructor(public payload: any) {}
}

export type ConsentAction =
  | LoadConsents
  | LoadConsentsSuccess
  | LoadConsentsFail
  | LoadCustomer
  | LoadCustomerSuccess
  | LoadCustomerFail
  | LoadCustomerQuotes
  | LoadCustomerQuotesSuccess
  | LoadCustomerQuotesFail
  | LoadCustomerPolicies
  | LoadCustomerPoliciesSuccess
  | LoadCustomerPoliciesFail
  | LoadCustomerClaims
  | LoadCustomerClaimsSuccess
  | LoadCustomerClaimsFail
  | TransferCart
  | TransferCartSuccess
  | TransferCartFail
  | CreateAddress
  | CreateAddressSuccess
  | CartActions.CreateCartFail;
