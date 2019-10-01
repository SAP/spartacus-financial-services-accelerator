import { Action } from '@ngrx/store';

export const LOAD_CLAIM_POLICIES = '[ClaimPolicies] Load Claim-Policies';
export const LOAD_CLAIM_POLICIES_SUCCESS =
  '[ClaimPolicies] Load Claim-Policies Success';
export const LOAD_CLAIM_POLICIES_FAIL =
  '[ClaimPolicies] Load Claim-Policies Fail';

export class LoadClaimPolicies implements Action {
  readonly type = LOAD_CLAIM_POLICIES;
  constructor(
    public payload: {
      userId: string;
      policyCategoryCode: string;
    }
  ) {}
}

export class LoadClaimPoliciesSuccess implements Action {
  readonly type = LOAD_CLAIM_POLICIES_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadClaimPoliciesFail implements Action {
  readonly type = LOAD_CLAIM_POLICIES_FAIL;
  constructor(public payload: any) {}
}

export type ClaimPoliciesAction =
  | LoadClaimPolicies
  | LoadClaimPoliciesSuccess
  | LoadClaimPoliciesFail;
