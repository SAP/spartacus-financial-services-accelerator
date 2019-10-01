import { CART_DATA, StateLoaderActions } from '@spartacus/core';

export const ADD_OPTIONAL_PRODUCT = '[Cart] Add Optional Product';
export const START_BUNDLE = '[Cart] Start Bundle';

export class AddOptionalProduct extends StateLoaderActions.LoaderLoadAction {
  readonly type = ADD_OPTIONAL_PRODUCT;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export class StartBundle extends StateLoaderActions.LoaderLoadAction {
  readonly type = START_BUNDLE;
  constructor(public payload: any) {
    super(CART_DATA);
  }
}

export type FSCartAction = AddOptionalProduct | StartBundle;
