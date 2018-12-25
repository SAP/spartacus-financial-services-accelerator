import { Action } from '@ngrx/store';

export const LOAD_POLICY_DETAILS = '[User] Load Policy Details';
export const LOAD_POLICY_DETAILS_FAIL = '[User] Load Policy Fail';
export const LOAD_POLICY_DETAILS_SUCCESS = '[User] Load Policy Success';
export const CLEAR_POLICY_DETAILS = '[User] Clear Policy Details';

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

export type PolicyDetailsAction =
  | LoadPolicyDetails
  | LoadPolicyDetailsFail
  | LoadPolicyDetailsSuccess
  | ClearPolicyDetails

