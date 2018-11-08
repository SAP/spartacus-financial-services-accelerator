import { Action } from '@ngrx/store';

export const DELETE_CLAIM = '[Claim] Delete Claim';
export const DELETE_CLAIM_SUCCESS = '[Claim] Delete Claim Success';
export const DELETE_CLAIM_FAIL = '[Claim] Delete Claim Fail';

export const LOAD_CLAIMS = '[Claim] Load Claims';
export const LOAD_CLAIMS_SUCCESS = '[Claim] Load Claims Success';
export const LOAD_CLAIMS_FAIL = '[Claim] Load Claims Fail';

export class DeleteClaim implements Action {
  readonly type = DELETE_CLAIM;
  constructor(public payload: any) {}
}

export class DeleteClaimSuccess implements Action {
  readonly type = DELETE_CLAIM_SUCCESS;
  constructor() {}
}

export class DeleteClaimFail implements Action {
  readonly type = DELETE_CLAIM_FAIL;
  constructor(public payload: any) {}
}

export class LoadClaims implements Action {
  readonly type = LOAD_CLAIMS;
  constructor(public payload: { userId: string, claims: any}) {}
}

export class LoadClaimsSuccess implements Action {
  readonly type = LOAD_CLAIMS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadClaimsFail implements Action {
  readonly type = LOAD_CLAIMS_FAIL;
  constructor(public payload: any) {}
}

export type ClaimAction =
  | DeleteClaim
  | DeleteClaimSuccess
  | DeleteClaimFail
  | LoadClaims
  | LoadClaimsSuccess
  | LoadClaimsFail;
