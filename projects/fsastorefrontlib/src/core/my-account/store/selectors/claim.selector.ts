import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from './feature.selector';
import * as fromClaim from '../reducers/claim.reducer';
import {
  ClaimState,
  MyAccountState,
  StateWithMyAccount,
} from '../my-account-state';

export const getClaimsState: MemoizedSelector<StateWithMyAccount, ClaimState> =
  createSelector(
    fromFeature.getUserState,
    (claimState: MyAccountState) => claimState.claims
  );

export const getClaims: MemoizedSelector<StateWithMyAccount, any> =
  createSelector(getClaimsState, fromClaim.getClaims);

export const getClaimsRefresh: MemoizedSelector<StateWithMyAccount, boolean> =
  createSelector(getClaimsState, fromClaim.getRefresh);

export const getClaimsLoaded: MemoizedSelector<StateWithMyAccount, boolean> =
  createSelector(getClaimsState, fromClaim.getLoaded);

export const getClaimContent: MemoizedSelector<StateWithMyAccount, any> =
  createSelector(getClaimsState, fromClaim.getContent);
