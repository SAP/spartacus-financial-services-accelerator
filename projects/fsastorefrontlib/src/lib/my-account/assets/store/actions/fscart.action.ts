import { Action } from '@ngrx/store';
import { CART_DATA, LoaderLoadAction, LoaderSuccessAction, LoaderFailAction } from '@spartacus/core';
export const ADD_OPTIONAL_PRODUCT = '[Cart] Add Optional Product';
export const ADD_OPTIONAL_PRODUCT_SUCCESS = '[Cart] Add Optional Product Success';
export const ADD_OPTIONAL_PRODUCT_FAIL = '[Cart] Add Optional Product Fail';

export class AddOptionalProduct extends LoaderLoadAction implements Action {
  readonly type = ADD_OPTIONAL_PRODUCT;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class AddOptionalProductSuccess extends LoaderSuccessAction implements Action {
  readonly type = ADD_OPTIONAL_PRODUCT_SUCCESS;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class AddOptionalProductFail extends LoaderFailAction {
  readonly type = ADD_OPTIONAL_PRODUCT_FAIL;
  constructor(public payload: any) {
    super(CART_DATA, payload);
  }}

export type CartAction =
  | AddOptionalProduct
  | AddOptionalProductSuccess
  | AddOptionalProductFail