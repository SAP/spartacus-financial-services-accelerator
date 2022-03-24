import { Action } from '@ngrx/store';

export const LOAD_POLICIES = '[Policy] Load Policies';
export const LOAD_POLICIES_SUCCESS = '[Policy] Load Policies Success';
export const LOAD_POLICIES_FAIL = '[Policy] Load Policies Fail';

/**
 * @deprecated since version 4.0.2
 * Use connector directly, as we remove store for this feature.
 */
export const LOAD_PREMIUM_CALENDAR = '[Policy] Load PremiumCalendar';
/**
 * @deprecated since version 4.0.2
 * Use connector directly, as we remove store for this feature.
 */
export const LOAD_PREMIUM_CALENDAR_SUCCESS =
  '[Policy] Load PremiumCalendar Success';
/**
 * @deprecated since version 4.0.2
 * Use connector directly, as we remove store for this feature.
 */
export const LOAD_PREMIUM_CALENDAR_FAIL = '[Policy] Load PremiumCalendar Fail';

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

/**
 * @deprecated since version 4.0.2
 * Use connector directly, as we remove store for this feature.
 */
export class LoadPremiumCalendar implements Action {
  readonly type = LOAD_PREMIUM_CALENDAR;
  constructor(public payload: any) {}
}
/**
 * @deprecated since version 4.0.2
 * Use connector directly, as we remove store for this feature.
 */
export class LoadPremiumCalendarSuccess implements Action {
  readonly type = LOAD_PREMIUM_CALENDAR_SUCCESS;
  constructor(public payload: any) {}
}
/**
 * @deprecated since version 4.0.2
 * Use connector directly, as we remove store for this feature.
 */
export class LoadPremiumCalendarFail implements Action {
  readonly type = LOAD_PREMIUM_CALENDAR_FAIL;
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
  | LoadPremiumCalendar
  | LoadPremiumCalendarSuccess
  | LoadPremiumCalendarFail
  | LoadPolicyDetails
  | LoadPolicyDetailsFail
  | LoadPolicyDetailsSuccess
  | ClearPolicyDetails;
