import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';
import * as fromClaim from './../reducers/claim.reducer';

export const getActiveClaimState: MemoizedSelector<
  any,
  fromClaim.ClaimState
> = createSelector(
  fromFeature.getClaimState,
  (claimState: fromFeature.ClaimState) => claimState.active
);

export const getActiveClaims: MemoizedSelector<any, any> = createSelector(
  getActiveClaimState,
  fromClaim.getClaims
);

export const getClaimRefresh: MemoizedSelector<any, boolean> = createSelector(
  getActiveClaimState,
  fromClaim.getRefresh
);

export const getClaimLoaded: MemoizedSelector<any, boolean> = createSelector(
  getActiveClaimState,
  fromClaim.getLoaded
);

export const getClaimsMap: MemoizedSelector<any, any> = createSelector(
  getActiveClaimState,
  fromClaim.getClaims
);

export const getClaimEntrySelectorFactory = (
  claimId
): MemoizedSelector<any, any> => {
  return createSelector(getClaimsMap, claims => {
    if (claims) {
      return claims[claimId];
    }
  });
};

export const getClaims: MemoizedSelector<any, any> = createSelector(
  getClaimsMap,
  claims => {
    return Object.keys(claims).map(claimId => claims[claimId]);
  }
);
