import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from './feature.selector';
import * as fromClaimPolicies from '../reducers/claim-policies.reducer';
import {
  ClaimPoliciesState,
  MyAccountState,
  StateWithMyAccount,
} from '../my-account-state';

export const getClaimPoliciesState: MemoizedSelector<
  StateWithMyAccount,
  ClaimPoliciesState
> = createSelector(
  fromFeature.getUserState,
  (claimPoliciesState: MyAccountState) => claimPoliciesState.claimPolicies
);

export const getClaimPoliciesLoaded: MemoizedSelector<
  StateWithMyAccount,
  boolean
> = createSelector(
  getClaimPoliciesState,
  fromClaimPolicies.getLoadedClaimPolicies
);
