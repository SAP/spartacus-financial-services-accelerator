import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  PRODUCT_ASSIGNMENT_FEATURE,
  ProductAssignmentsState,
  StateWithProductAssignment,
} from '../product-assignments-state';

export const getProductAssignmentState: MemoizedSelector<
  StateWithProductAssignment,
  ProductAssignmentsState
> = createFeatureSelector<ProductAssignmentsState>(PRODUCT_ASSIGNMENT_FEATURE);
