import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ClaimState, FSClaimState, StateWithClaim } from '../claim-state';
import * as fromFeature from '../reducers';
import * as fromUserRequest from '../reducers/claim.reducer';
import { FSUserRequest } from '../../../../occ/occ-models';

export const getClaimState: MemoizedSelector<
  StateWithClaim,
  ClaimState
> = createSelector(
  fromFeature.getClaimState,
  (userRequestState: FSClaimState) => userRequestState.claim
);

export const getClaimContent: MemoizedSelector<
  StateWithClaim,
  FSUserRequest
> = createSelector(
  getClaimState,
  fromUserRequest.getClaimContent
);

export const getLoaded: MemoizedSelector<StateWithClaim, any> = createSelector(
  getClaimState,
  (state: ClaimState) => state.loaded
);
