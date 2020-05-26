import { StateUtils, MULTI_CART_DATA } from '@spartacus/core';

export const ADD_OPTIONAL_PRODUCT = '[Cart] Add Optional Product';
export const START_BUNDLE = '[Cart] Start Bundle';

export class AddOptionalProduct extends StateUtils.LoaderLoadAction {
  readonly type = ADD_OPTIONAL_PRODUCT;
  constructor(public payload: any) {
    super(MULTI_CART_DATA);
  }
}

export class StartBundle extends StateUtils.LoaderLoadAction {
  readonly type = START_BUNDLE;
  constructor(public payload: any) {
    super(MULTI_CART_DATA);
  }
}

export type CartAction = AddOptionalProduct | StartBundle;
