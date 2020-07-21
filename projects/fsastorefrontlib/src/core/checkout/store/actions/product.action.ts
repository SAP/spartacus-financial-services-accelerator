import { PRODUCT_DETAIL_ENTITY, StateUtils } from '@spartacus/core';

export const LOAD_CALCULATED_PRODUCT_DATA =
  '[Product] Load Calculated Product Data';

export class LoadCalculatedProductData extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_CALCULATED_PRODUCT_DATA;
  constructor(public payload: any) {
    super(PRODUCT_DETAIL_ENTITY);
  }
}

export type ProductAction = LoadCalculatedProductData;
