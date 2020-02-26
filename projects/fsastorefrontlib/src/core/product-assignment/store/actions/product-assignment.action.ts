import { Action } from '@ngrx/store';

export const LOAD_PRODUCT_ASSIGNMENTS =
  '[Product Assignment] Load Product Assignments';
export const LOAD_PRODUCT_ASSIGNMENTS_FAIL =
  '[Product Assignment] Load Product Assignments Fail';
export const LOAD_PRODUCT_ASSIGNMENTS_SUCCESS =
  '[Product Assignment] Load Product Assignments Success';
export const UPDATE_PRODUCT_ASSIGNMENT =
  '[Product Assignment] Update Product Assignment';
export const UPDATE_PRODUCT_ASSIGNMENT_FAIL =
  '[Product Assignment] ACTIVATE Product Assignments FAIL';
export const UPDATE_PRODUCT_ASSIGNMENT_SUCCESS =
  '[Product Assignment] Update Product Assignment Success';

export class LoadProductAssignments implements Action {
  readonly type = LOAD_PRODUCT_ASSIGNMENTS;
  constructor(public payload: any) {}
}

export class LoadProductAssignmentsFail implements Action {
  readonly type = LOAD_PRODUCT_ASSIGNMENTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadProductAssignmentsSuccess implements Action {
  readonly type = LOAD_PRODUCT_ASSIGNMENTS_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateProductAssignment implements Action {
  readonly type = UPDATE_PRODUCT_ASSIGNMENT;
  constructor(public payload: any) {}
}
export class UpdateProductAssignmentFail implements Action {
  readonly type = UPDATE_PRODUCT_ASSIGNMENT_FAIL;
  constructor(public payload: any) {}
}
export class UpdateProductAssignmentSuccess implements Action {
  readonly type = UPDATE_PRODUCT_ASSIGNMENT_SUCCESS;
  constructor(public payload: any) {}
}

export type ProductAssignmentActions =
  | LoadProductAssignments
  | LoadProductAssignmentsFail
  | LoadProductAssignmentsSuccess
  | UpdateProductAssignment
  | UpdateProductAssignmentFail
  | UpdateProductAssignmentSuccess;
