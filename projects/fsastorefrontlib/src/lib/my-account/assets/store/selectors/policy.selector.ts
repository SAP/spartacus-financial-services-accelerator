import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromPolicy from '../reducers/policy.reducer';


export const getPoliciesState: MemoizedSelector<
  any,
  fromPolicy.PolicyState
> = createSelector(
  fromFeature.getUserState,
  (policyState: fromFeature.UserState) => policyState.policies
);

export const getPolicyData: MemoizedSelector<any, any> = createSelector(
  getPoliciesState,
  fromPolicy.getPolicyData
);

export const getPoliciesRefresh: MemoizedSelector<any, boolean> = createSelector(
  getPoliciesState,
  fromPolicy.getRefresh
);

export const getPoliciesLoaded: MemoizedSelector<any, boolean> = createSelector(
  getPoliciesState,
  fromPolicy.getLoaded
);
