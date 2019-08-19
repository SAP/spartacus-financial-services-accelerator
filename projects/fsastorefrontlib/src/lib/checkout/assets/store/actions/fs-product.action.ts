import { StateEntityLoaderActions, PRODUCT_DETAIL_ENTITY } from '@spartacus/core';

export const LOAD_EXTENDED_PRODUCT_DATA = '[Product] Load Extended Product Data';

export class LoadExtendedProductData extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = LOAD_EXTENDED_PRODUCT_DATA;
  constructor(public payload: any) {
    super(PRODUCT_DETAIL_ENTITY, payload);
  }
}

export type ProductAction = LoadExtendedProductData;
