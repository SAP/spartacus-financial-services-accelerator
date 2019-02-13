import { Action } from '@ngrx/store';
import { CART_DATA, LoaderLoadAction } from '@spartacus/core';
export const ADD_OPTIONAL_PRODUCT = '[Cart] Add Optional Product';

export class AddOptionalProduct extends LoaderLoadAction {
  readonly type = ADD_OPTIONAL_PRODUCT;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export type FSCartAction =
  | AddOptionalProduct