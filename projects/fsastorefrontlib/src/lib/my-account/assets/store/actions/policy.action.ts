import { Action } from '@ngrx/store';

export const LOAD_POLICIES = '[Policy] Load Policies';
export const LOAD_POLICIES_SUCCESS = '[Policy] Load Policies Success';
export const LOAD_POLICIES_FAIL = '[Policy] Load Policies Fail';

export class LoadPolicies implements Action {
  readonly type = LOAD_POLICIES;
  constructor(public payload: any) {}
}

export class LoadPoliciesSuccess implements Action {
  readonly type = LOAD_POLICIES_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadPoliciesFail implements Action {
  readonly type = LOAD_POLICIES_FAIL;
  constructor(public payload: any) {}
}

export type PolicyAction =
  | LoadPolicies
  | LoadPoliciesSuccess
  | LoadPoliciesFail;
