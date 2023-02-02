import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from './feature.selector';
import * as fromPolicy from '../reducers/policy.reducer';
import {
  MyAccountState,
  PolicyState,
  StateWithMyAccount,
} from '../my-account-state';

export const getPoliciesState: MemoizedSelector<
  StateWithMyAccount,
  PolicyState
> = createSelector(
  fromFeature.getUserState,
  (policyState: MyAccountState) => policyState.policies
);

export const getPolicies: MemoizedSelector<StateWithMyAccount, any> =
  createSelector(getPoliciesState, fromPolicy.getPolicies);

export const getPolicyDetails: MemoizedSelector<StateWithMyAccount, any> =
  createSelector(getPoliciesState, fromPolicy.getPolicyData);

export const getPoliciesLoaded: MemoizedSelector<StateWithMyAccount, boolean> =
  createSelector(getPoliciesState, fromPolicy.getLoaded);
