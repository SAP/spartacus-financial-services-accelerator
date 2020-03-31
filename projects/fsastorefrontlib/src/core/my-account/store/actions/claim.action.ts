import { Action } from '@ngrx/store';

export const DELETE_CLAIM = '[Claim] Delete Claim';
export const DELETE_CLAIM_SUCCESS = '[Claim] Delete Claim Success';
export const DELETE_CLAIM_FAIL = '[Claim] Delete Claim Fail';

export const LOAD_CLAIMS = '[Claim] Load Claims';
export const LOAD_CLAIMS_SUCCESS = '[Claim] Load Claims Success';
export const LOAD_CLAIMS_FAIL = '[Claim] Load Claims Fail';

export const LOAD_CURRENT_CLAIM = '[Claim] Load Current Claim';
export const LOAD_CURRENT_CLAIM_FAIL = '[Claim] Load Current Claim Fail';
export const LOAD_CURRENT_CLAIM_SUCCESS = '[Claim] Load Current Claim Success';

export const CREATE_CLAIM = '[Claim] Create Claim';
export const CREATE_CLAIM_FAIL = '[Claim] Create Claim Fail';
export const CREATE_CLAIM_SUCCESS = '[Claim] Create Claim Success';

export const UPDATE_CLAIM = '[Claim] Update Claim';
export const UPDATE_CLAIM_FAIL = '[Claim] Update Claim Fail';
export const UPDATE_CLAIM_SUCCESS = '[Claim] Update Claim Success';

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
  constructor(public payload: any) {}
}

export class LoadClaimsSuccess implements Action {
  readonly type = LOAD_CLAIMS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadClaimsFail implements Action {
  readonly type = LOAD_CLAIMS_FAIL;
  constructor(public payload: any) {}
}

export class LoadCurrentClaim implements Action {
  readonly type = LOAD_CURRENT_CLAIM;
  constructor(public payload: any) {}
}

export class LoadCurrentClaimSuccess implements Action {
  readonly type = LOAD_CURRENT_CLAIM_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadCurrentClaimFail implements Action {
  readonly type = LOAD_CURRENT_CLAIM_FAIL;
  constructor(public payload: any) {}
}

export class CreateClaim implements Action {
  readonly type = CREATE_CLAIM;
  constructor(public payload: any) {}
}

export class CreateClaimFail implements Action {
  readonly type = CREATE_CLAIM_FAIL;
  constructor(public payload: any) {}
}

export class CreateClaimSuccess implements Action {
  readonly type = CREATE_CLAIM_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateClaim implements Action {
  readonly type = UPDATE_CLAIM;
  constructor(public payload: any) {}
}

export class UpdateClaimFail implements Action {
  readonly type = UPDATE_CLAIM_FAIL;
  constructor(public payload: any) {}
}

export class UpdateClaimSuccess implements Action {
  readonly type = UPDATE_CLAIM_SUCCESS;
  constructor(public payload: any) {}
}

export type ClaimAction =
  | DeleteClaim
  | DeleteClaimSuccess
  | DeleteClaimFail
  | LoadClaims
  | LoadClaimsSuccess
  | LoadClaimsFail
  | LoadCurrentClaim
  | LoadCurrentClaimSuccess
  | LoadCurrentClaimFail
  | CreateClaim
  | CreateClaimSuccess
  | CreateClaimFail
  | UpdateClaim
  | UpdateClaimSuccess
  | UpdateClaimFail;
