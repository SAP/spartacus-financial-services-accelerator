import { createSelector, MemoizedSelector } from '@ngrx/store';
import { PolicyDetailsState } from './../reducers/policy-details.reducer';

import * as fromFeature from '../reducers';
import * as fromPolicyDetails from '../reducers/policy-details.reducer';

export const getActivePolicyDetailsState: MemoizedSelector<
  any,
  PolicyDetailsState
> = createSelector(
  fromFeature.getUserState,
  (state: fromFeature.UserState) => state.policyDetails
);

export const getPolicyDetails: MemoizedSelector<any, any> = createSelector(
  getActivePolicyDetailsState,
  fromPolicyDetails.getPolicyDetails
);
