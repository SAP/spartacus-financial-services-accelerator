import { Action } from '@ngrx/store';

export const LOAD_PRODUCT_ASSIGNMENTS =
  '[Product Assignment] Load Product Assignments';
export const LOAD_PRODUCT_ASSIGNMENTS_FAIL =
  '[Product Assignment] Load Product Assignments Fail';
export const LOAD_PRODUCT_ASSIGNMENTS_SUCCESS =
  '[Product Assignment] Load Product Assignments Success';

export const CREATE_PRODUCT_ASSIGNMENT =
  '[Product Assignment] Create Product Assignment';
export const CREATE_PRODUCT_ASSIGNMENT_SUCCESS =
  '[Product Assignment] Create Product Assignment Success';
export const CREATE_PRODUCT_ASSIGNMENT_FAIL =
  '[Product Assignment] Create Product Assignment Fail';

export const REMOVE_PRODUCT_ASSIGNMENT =
  '[Product Assignment] Remove Product Assignment';
export const REMOVE_PRODUCT_ASSIGNMENT_SUCCESS =
  '[Product Assignment] Remove Product Assignment Success';
export const REMOVE_PRODUCT_ASSIGNMENT_FAIL =
  '[Product Assignment] Remove Product Assignment Fail';

export const LOAD_POTENTIAL_PRODUCT_ASSIGNMENTS =
  '[Product Assignment] Load Potential Product Assignments';
export const LOAD_POTENTIAL_PRODUCT_ASSIGNMENTS_FAIL =
  '[Product Assignment] Load Potential Product Assignments Fail';
export const LOAD_POTENTIAL_PRODUCT_ASSIGNMENTS_SUCCESS =
  '[Product Assignment] Load Potential Product Assignments Success';

export const UPDATE_PRODUCT_ASSIGNMENT =
  '[Product Assignment] Update Product Assignment';
export const UPDATE_PRODUCT_ASSIGNMENT_FAIL =
  '[Product Assignment] Update Product Assignments FAIL';
export const UPDATE_PRODUCT_ASSIGNMENT_SUCCESS =
  '[Product Assignment] Update Product Assignment Success';

export class LoadProductAssignments implements Action {
  readonly type = LOAD_PRODUCT_ASSIGNMENTS;
  constructor(public payload: any) {}
}

export class LoadProductAssignmentsSuccess implements Action {
  readonly type = LOAD_PRODUCT_ASSIGNMENTS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadProductAssignmentsFail implements Action {
  readonly type = LOAD_PRODUCT_ASSIGNMENTS_FAIL;
  constructor(public payload: any) {}
}

export class CreateProductAssignment implements Action {
  readonly type = CREATE_PRODUCT_ASSIGNMENT;
  constructor(public payload: any) {}
}

export class CreateProductAssignmentSuccess implements Action {
  readonly type = CREATE_PRODUCT_ASSIGNMENT_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateProductAssignmentFail implements Action {
  readonly type = CREATE_PRODUCT_ASSIGNMENT_FAIL;
  constructor(public payload: any) {}
}

export class RemoveProductAssignment implements Action {
  readonly type = REMOVE_PRODUCT_ASSIGNMENT;
  constructor(public payload: any) {}
}

export class RemoveProductAssignmentSuccess implements Action {
  readonly type = REMOVE_PRODUCT_ASSIGNMENT_SUCCESS;
  constructor() {}
}

export class RemoveProductAssignmentFail implements Action {
  readonly type = REMOVE_PRODUCT_ASSIGNMENT_FAIL;
  constructor(public payload: any) {}
}

export class LoadPotentialProductAssignments implements Action {
  readonly type = LOAD_POTENTIAL_PRODUCT_ASSIGNMENTS;
  constructor(public payload: any) {}
}

export class LoadPotentialProductAssignmentsSuccess implements Action {
  readonly type = LOAD_POTENTIAL_PRODUCT_ASSIGNMENTS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadPotentialProductAssignmentsFail implements Action {
  readonly type = LOAD_POTENTIAL_PRODUCT_ASSIGNMENTS_FAIL;
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
  | CreateProductAssignment
  | CreateProductAssignmentSuccess
  | CreateProductAssignmentFail
  | RemoveProductAssignment
  | RemoveProductAssignmentSuccess
  | RemoveProductAssignmentFail
  | LoadPotentialProductAssignments
  | LoadPotentialProductAssignmentsFail
  | LoadPotentialProductAssignmentsSuccess
  | UpdateProductAssignment
  | UpdateProductAssignmentFail
  | UpdateProductAssignmentSuccess;
