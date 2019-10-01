import {
  PRODUCT_DETAIL_ENTITY,
  StateEntityLoaderActions,
} from '@spartacus/core';

export const LOAD_CALCULATED_PRODUCT_DATA =
  '[Product] Load Calculated Product Data';

export class LoadCalculatedProductData extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = LOAD_CALCULATED_PRODUCT_DATA;
  constructor(public payload: any) {
    super(PRODUCT_DETAIL_ENTITY, payload);
  }
}

export type ProductAction = LoadCalculatedProductData;
