import { Action } from '@ngrx/store';
export const LOAD_CONSENTS = '[Consent] Load Consents';
export const LOAD_CONSENTS_SUCCESS = '[Consent] Load Consents Success';
export const LOAD_CONSENTS_FAIL = '[Consent] Load Consents Fail';
export const LOAD_CUSTOMER = '[Consent] Load Customer';
export const LOAD_CUSTOMER_SUCCESS = '[Consent] Load Customer Success';
export const LOAD_CUSTOMER_FAIL = '[Consent] Load Customer Fail';
export const LOAD_CUSTOMER_ASSETS = '[Consent] Load Customer Quotes';
export const LOAD_CUSTOMER_ASSETS_SUCCESS =
  '[Consent] Load Customer Quotes Success';
export const LOAD_CUSTOMER_ASSETS_FAIL = '[Consent] Load Customer Quotes Fail';
// export const LOAD_CUSTOMER_QUOTES = '[Consent] Load Customer Quotes';
// export const LOAD_CUSTOMER_QUOTES_SUCCESS =
//   '[Consent] Load Customer Quotes Success';
// export const LOAD_CUSTOMER_QUOTES_FAIL = '[Consent] Load Customer Quotes Fail';
// export const LOAD_CUSTOMER_POLICIES = '[Consent] Load Customer Policies';
// export const LOAD_CUSTOMER_POLICIES_SUCCESS =
//   '[Consent] Load Customer Policies Success';
// export const LOAD_CUSTOMER_POLICIES_FAIL =
//   '[Consent] Load Customer Policies Fail';
// export const LOAD_CUSTOMER_CLAIMS = '[Consent] Load Customer Claims';
// export const LOAD_CUSTOMER_CLAIMS_SUCCESS =
//   '[Consent] Load Customer Claims Success';
// export const LOAD_CUSTOMER_CLAIMS_FAIL = '[Consent] Load Customer Claims Fail';

export class LoadConsents implements Action {
  readonly type = LOAD_CONSENTS;
  constructor(public payload: any) {}
}

export class LoadConsentsSuccess implements Action {
  readonly type = LOAD_CONSENTS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadConsentsFail implements Action {
  readonly type = LOAD_CONSENTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadCustomer implements Action {
  readonly type = LOAD_CUSTOMER;
  constructor(public payload: any) {}
}

export class LoadCustomerSuccess implements Action {
  readonly type = LOAD_CUSTOMER_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadCustomerFail implements Action {
  readonly type = LOAD_CUSTOMER_FAIL;
  constructor(public payload: any) {}
}

export class LoadCustomerAssets implements Action {
  readonly type = LOAD_CUSTOMER_ASSETS;
  constructor(public payload: any) {}
}

export class LoadCustomerAssetsSuccess implements Action {
  readonly type = LOAD_CUSTOMER_ASSETS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadCustomerAssetsFail implements Action {
  readonly type = LOAD_CUSTOMER_ASSETS_FAIL;
  constructor(public payload: any) {}
}


// export class LoadCustomerQuotes implements Action {
//   readonly type = LOAD_CUSTOMER_QUOTES;
//   constructor(public payload: any) {}
// }

// export class LoadCustomerQuotesSuccess implements Action {
//   readonly type = LOAD_CUSTOMER_QUOTES_SUCCESS;
//   constructor(public payload: any) {}
// }

// export class LoadCustomerQuotesFail implements Action {
//   readonly type = LOAD_CUSTOMER_QUOTES_FAIL;
//   constructor(public payload: any) {}
// }

// export class LoadCustomerPolicies implements Action {
//   readonly type = LOAD_CUSTOMER_POLICIES;
//   constructor(public payload: any) {}
// }

// export class LoadCustomerPoliciesSuccess implements Action {
//   readonly type = LOAD_CUSTOMER_POLICIES_SUCCESS;
//   constructor(public payload: any) {}
// }

// export class LoadCustomerPoliciesFail implements Action {
//   readonly type = LOAD_CUSTOMER_POLICIES_FAIL;
//   constructor(public payload: any) {}
// }

// export class LoadCustomerClaims implements Action {
//   readonly type = LOAD_CUSTOMER_CLAIMS;
//   constructor(public payload: any) {}
// }

// export class LoadCustomerClaimsSuccess implements Action {
//   readonly type = LOAD_CUSTOMER_CLAIMS_SUCCESS;
//   constructor(public payload: any) {}
// }

// export class LoadCustomerClaimsFail implements Action {
//   readonly type = LOAD_CUSTOMER_CLAIMS_FAIL;
//   constructor(public payload: any) {}
// }

export type ConsentAction =
  | LoadConsents
  | LoadConsentsSuccess
  | LoadConsentsFail
  | LoadCustomer
  | LoadCustomerSuccess
  | LoadCustomerFail
  | LoadCustomerAssets
  | LoadCustomerAssetsSuccess
  | LoadCustomerAssetsFail;
  // | LoadCustomerQuotes
  // | LoadCustomerQuotesSuccess
  // | LoadCustomerQuotesFail
  // | LoadCustomerPolicies
  // | LoadCustomerPoliciesSuccess
  // | LoadCustomerPoliciesFail
  // | LoadCustomerClaims
  // | LoadCustomerClaimsSuccess
  // | LoadCustomerClaimsFail;
