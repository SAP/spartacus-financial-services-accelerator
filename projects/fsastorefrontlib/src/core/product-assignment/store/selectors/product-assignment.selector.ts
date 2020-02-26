import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromProductAssignment from './../reducers/product-assignment.reducer';


export const getProductAssignmentState: MemoizedSelector<
  any,
  fromProductAssignment.ProductAssignmentState
> = createSelector(
  fromFeature.getProductAssignmentState,
  (productAssignmentState: fromFeature.ProductAssignmentState) =>
    productAssignmentState.productAssignments
);

export const getProductAssignments: MemoizedSelector<any, any> = createSelector(
  getProductAssignmentState,
  fromProductAssignment.getProductAssignment2
);

export const getLoaded: MemoizedSelector<any, any> = createSelector(
  getProductAssignmentState,
  fromProductAssignment.getLoaded
);
