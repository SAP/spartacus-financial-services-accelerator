import { Action } from '@ngrx/store';

export const LOAD_PRODUCT_ASSIGNMENTS =
  '[Product Assignment] Load Product Assignments';
export const LOAD_PRODUCT_ASSIGNMENTS_FAIL =
  '[Product Assignment] Load Product Assignments Fail';
export const LOAD_PRODUCT_ASSIGNMENTS_SUCCESS =
  '[Product Assignment] Load Product Assignments Success';
  export const ACTIVATE_PRODUCT_ASSIGNMENTS_SUCCESS =
  '[Product Assignment] ACTIVATE Product Assignments Success';
  export const ACTIVATE_PRODUCT_ASSIGNMENTS_FAIL =
  '[Product Assignment] ACTIVATE Product Assignments FAIL';
  export const ACTIVATE_PRODUCT_ASSIGNMENTS =
  '[Product Assignment] ACTIVATE Product Assignments';

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

export class ActivateProductAssignment implements Action {
  readonly type = ACTIVATE_PRODUCT_ASSIGNMENTS;
  constructor(public payload: any) {}


}export class ActivateProductAssignmentFail implements Action {
  readonly type = ACTIVATE_PRODUCT_ASSIGNMENTS_FAIL;
  constructor(public payload: any) {}

}
export class ActivateProductAssignmentSuccess implements Action {
  readonly type = ACTIVATE_PRODUCT_ASSIGNMENTS_SUCCESS;
  constructor(public payload: any) {}
}


export type ProductAssignmentActions =
  | LoadProductAssignments
  | LoadProductAssignmentsFail
  | LoadProductAssignmentsSuccess
  | ActivateProductAssignment
  | ActivateProductAssignmentSuccess
  | ActivateProductAssignmentFail;
