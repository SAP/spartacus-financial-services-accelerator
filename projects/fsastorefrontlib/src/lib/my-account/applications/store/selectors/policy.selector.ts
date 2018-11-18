import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';
import * as fromPolicy from './../reducers/policy.reducer';

export const getActivePolicyState: MemoizedSelector<
  any,
  fromPolicy.PolicyState
> = createSelector(
  fromFeature.getPolicyState,
  (policyState: fromFeature.PolicyState) => policyState.active
);

export const getActivePolicies: MemoizedSelector<any, any> = createSelector(
  getActivePolicyState,
  fromPolicy.getPolicies
);

export const getPolicyRefresh: MemoizedSelector<any, boolean> = createSelector(
  getActivePolicyState,
  fromPolicy.getRefresh
);

export const getPolicyLoaded: MemoizedSelector<any, boolean> = createSelector(
  getActivePolicyState,
  fromPolicy.getLoaded
);

export const getPoliciesMap: MemoizedSelector<any, any> = createSelector(
  getActivePolicyState,
  fromPolicy.getPolicies
);

export const getPolicyEntrySelectorFactory = (
  policyId
): MemoizedSelector<any, any> => {
  return createSelector(getPoliciesMap, policies => {
    if (policies) {
      return policies[policyId];
    }
  });
};

export const getPolicies: MemoizedSelector<any, any> = createSelector(
  getPoliciesMap,
  policies => {
    return Object.keys(policies).map(policyId => policies[policyId]);
  }
);
