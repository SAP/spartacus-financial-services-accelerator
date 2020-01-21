import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromClaimPolicies from '../reducers/claim-policies.reducer';

export const getClaimPoliciesState: MemoizedSelector<
  any,
  fromClaimPolicies.ClaimPoliciesState
> = createSelector(
  fromFeature.getUserState,
  (claimPoliciesState: fromFeature.UserState) =>
    claimPoliciesState.claimPolicies
);

export const getClaimPoliciesLoaded: MemoizedSelector<
  any,
  boolean
> = createSelector(
  getClaimPoliciesState,
  fromClaimPolicies.getLoadedClaimPolicies
);
