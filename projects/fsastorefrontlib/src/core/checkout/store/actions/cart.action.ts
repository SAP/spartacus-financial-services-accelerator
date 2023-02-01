import { StateUtils } from '@spartacus/core';
import { MULTI_CART_DATA } from '@spartacus/cart/base/core';

export const ADD_OPTIONAL_PRODUCT = '[Cart] Add Optional Product';
export const START_BUNDLE = '[Cart] Start Bundle';
export const START_BUNDLE_FAIL = '[Cart] Start Bundle Fail';

export class AddOptionalProduct extends StateUtils.EntityProcessesIncrementAction {
  readonly type = ADD_OPTIONAL_PRODUCT;
  constructor(public payload: any) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class StartBundle extends StateUtils.EntityProcessesIncrementAction {
  readonly type = START_BUNDLE;
  constructor(public payload: any) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

export class StartBundleFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = START_BUNDLE_FAIL;
  constructor(public payload: any) {
    super(MULTI_CART_DATA, payload);
  }
}

export type CartAction = AddOptionalProduct | StartBundle | StartBundleFail;
