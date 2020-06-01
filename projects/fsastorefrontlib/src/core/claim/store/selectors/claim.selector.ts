import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ClaimState, FSClaimState, StateWithClaim } from '../claim-state';
import * as fromFeature from '../reducers';
import * as fromClaim from '../reducers/claim.reducer';
import { Claim } from '../../../../occ/occ-models';

export const getClaimState: MemoizedSelector<
  StateWithClaim,
  ClaimState
> = createSelector(
  fromFeature.getClaimState,
  (claimState: FSClaimState) => claimState.claim
);

export const getClaimContent: MemoizedSelector<
  StateWithClaim,
  Claim
> = createSelector(
  getClaimState,
  fromClaim.getClaimContent
);
