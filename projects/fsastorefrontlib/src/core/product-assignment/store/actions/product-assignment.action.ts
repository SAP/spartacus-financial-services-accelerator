import { StateEntityLoaderActions } from '@spartacus/core';

export const LOAD_PRODUCT_ASSIGNMENTS =
  '[Product Assignment] Load Product Assignments';
export const LOAD_PRODUCT_ASSIGNMENTS_FAIL =
  '[Product Assignment] Load Product Assignments Fail';
export const LOAD_PRODUCT_ASSIGNMENTS_SUCCESS =
  '[Product Assignment] Load Product Assignments Success';

export const PRODUCT_ASSIGNMENT_FEATURE = 'productAssignments';

export class LoadProductAssignments extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = LOAD_PRODUCT_ASSIGNMENTS;
  constructor(public payload: any) {
    super(PRODUCT_ASSIGNMENT_FEATURE, payload);
  }
}

export class LoadProductAssignmentsFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = LOAD_PRODUCT_ASSIGNMENTS_FAIL;
  constructor(public payload: { error?: any }) {
    super(PRODUCT_ASSIGNMENT_FEATURE, payload.error);
  }
}

export class LoadProductAssignmentsSuccess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = LOAD_PRODUCT_ASSIGNMENTS_SUCCESS;
  constructor(public payload: any) {
    super(PRODUCT_ASSIGNMENT_FEATURE, payload);
  }
}

export type ProductAssignmentActions =
  | LoadProductAssignments
  | LoadProductAssignmentsFail
  | LoadProductAssignmentsSuccess;
