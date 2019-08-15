import { StateEntityLoaderActions, PRODUCT_DETAIL_ENTITY } from '@spartacus/core';

export const LOAD_EXTENDED_PRODUCT = '[Product] Load Extended Product Data';

export class LoadExtendedProduct extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = LOAD_EXTENDED_PRODUCT;
  constructor(public payload: any) {
    super(PRODUCT_DETAIL_ENTITY, payload);
  }
}

// action types
export type ProductAction = LoadExtendedProduct