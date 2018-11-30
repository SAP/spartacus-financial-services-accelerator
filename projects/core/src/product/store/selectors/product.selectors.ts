import { createSelector, MemoizedSelector } from '@ngrx/store';

import { ProductsState } from '../product-state';
import { getProductsState } from './feature.selector';

export const getProductState: MemoizedSelector<any, any> = createSelector(
  getProductsState,
  (state: ProductsState) => state.details
);

export const getSelectedProductsFactory = (
  codes
): MemoizedSelector<any, any> => {
  return createSelector(
    getProductState,
    details => {
      return codes
        .map(code => details.entities[code])
        .filter(product => product !== undefined);
    }
  );
};

export const getSelectedProductFactory = (code): MemoizedSelector<any, any> => {
  return createSelector(
    getProductState,
    details => {
      return details.entities[code];
    }
  );
};

export const getAllProductCodes: MemoizedSelector<
  any,
  string[]
> = createSelector(
  getProductState,
  details => {
    return Object.keys(details.entities);
  }
);
