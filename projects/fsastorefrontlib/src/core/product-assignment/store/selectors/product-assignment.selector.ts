import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromProductAssignment from './../reducers/product-assignment.reducer';
import {
  ProductAssignmentsState,
  ProductAssignmentState,
  StateWithProductAssignment,
} from '../product-assignments-state';
import * as fromFeature from './feature.selector';

export const getProductAssignmentState: MemoizedSelector<
  StateWithProductAssignment,
  ProductAssignmentState
> = createSelector(
  fromFeature.getProductAssignmentState,
  (productAssignmentState: ProductAssignmentsState) =>
    productAssignmentState.productAssignments
);

export const getProductAssignmentContent: MemoizedSelector<
  StateWithProductAssignment,
  any
> = createSelector(
  getProductAssignmentState,
  fromProductAssignment.getProductAssignmentContent
);

export const getProductAssignments: MemoizedSelector<
  StateWithProductAssignment,
  any
> = createSelector(
  getProductAssignmentState,
  fromProductAssignment.getProductAssignments
);

export const getPotentialProductAssignments: MemoizedSelector<
  StateWithProductAssignment,
  any
> = createSelector(
  getProductAssignmentState,
  fromProductAssignment.getPotentialProductAssignments
);

export const getLoaded: MemoizedSelector<StateWithProductAssignment, any> =
  createSelector(getProductAssignmentState, fromProductAssignment.getLoaded);
