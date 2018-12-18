import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';
import * as fromClaim from './../reducers/claim.reducer';

export const getClaimsState: MemoizedSelector<
  any,
  fromClaim.ClaimState
> = createSelector(
  fromFeature.getUserState,
  (claimState: fromFeature.UserState) => claimState.claims
);

export const getClaims: MemoizedSelector<any, any> = createSelector(
  getClaimsState,
  fromClaim.getClaims
);

export const getClaimsRefresh: MemoizedSelector<any, boolean> = createSelector(
  getClaimsState,
  fromClaim.getRefresh
);

export const getClaimsLoaded: MemoizedSelector<any, boolean> = createSelector(
  getClaimsState,
  fromClaim.getLoaded
);

// export const getClaimsMap: MemoizedSelector<any, any> = createSelector(
//   getActiveClaimState,
//   fromClaim.getClaims
// );

// export const getClaimEntrySelectorFactory = (
//   claimId
// ): MemoizedSelector<any, any> => {
//   return createSelector(getClaimsMap, claims => {
//     if (claims) {
//       return claims[claimId];
//     }
//   });
// };

// export const getClaims: MemoizedSelector<any, any> = createSelector(
//   getClaimsMap,
//   claims => {
//     return Object.keys(claims).map(claimId => claims[claimId]);
//   }
// );
