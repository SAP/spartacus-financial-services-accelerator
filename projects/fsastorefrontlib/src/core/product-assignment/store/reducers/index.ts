import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import * as fromReducer from './product-assignment.reducer';
import { AuthActions } from '@spartacus/core';

export const PRODUCT_ASSIGNMENT_FEATURE = 'productAssignments';

export interface ProductAssignmentState {
  productAssignments: fromReducer.ProductAssignmentState;
}

export function getReducers(): ActionReducerMap<ProductAssignmentState> {
  return {
    productAssignments: fromReducer.reducer,
  };
}
export const reducerToken: InjectionToken<
  ActionReducerMap<ProductAssignmentState>
> = new InjectionToken<ActionReducerMap<ProductAssignmentState>>(
  'ProductAssignmentsReducers'
);
export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
export const getProductAssignmentState: MemoizedSelector<
  any,
  ProductAssignmentState
> = createFeatureSelector<ProductAssignmentState>('productAssignments');

export function clearProductAssignmentState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === AuthActions.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [clearProductAssignmentState];
