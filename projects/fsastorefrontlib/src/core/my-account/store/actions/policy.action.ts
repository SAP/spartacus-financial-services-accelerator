import { Action } from '@ngrx/store';

export const LOAD_POLICIES = '[Policy] Load Policies';
export const LOAD_POLICIES_SUCCESS = '[Policy] Load Policies Success';
export const LOAD_POLICIES_FAIL = '[Policy] Load Policies Fail';

export const LOAD_POLICY_DETAILS = '[Policy] Load Policy Details';
export const LOAD_POLICY_DETAILS_FAIL = '[Policy] Load Policy Fail';
export const LOAD_POLICY_DETAILS_SUCCESS = '[Policy] Load Policy Success';
export const CLEAR_POLICY_DETAILS = '[Policy] Clear Policy Details';

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

export class LoadPolicyDetails implements Action {
  readonly type = LOAD_POLICY_DETAILS;
  constructor(
    public payload: {
      userId: string;
      policyId: string;
      contractId: string;
    }
  ) {}
}

export class LoadPolicyDetailsFail implements Action {
  readonly type = LOAD_POLICY_DETAILS_FAIL;
  constructor(public payload: any) {}
}

export class LoadPolicyDetailsSuccess implements Action {
  readonly type = LOAD_POLICY_DETAILS_SUCCESS;
  constructor(public payload: any) {}
}

export class ClearPolicyDetails implements Action {
  readonly type = CLEAR_POLICY_DETAILS;
}

export type PolicyAction =
  | LoadPolicies
  | LoadPoliciesSuccess
  | LoadPoliciesFail
  | LoadPolicyDetails
  | LoadPolicyDetailsFail
  | LoadPolicyDetailsSuccess
  | ClearPolicyDetails;
