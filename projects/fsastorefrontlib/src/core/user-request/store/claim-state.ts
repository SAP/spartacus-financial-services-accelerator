import { Claim, FSUserRequest } from '../../../occ/occ-models';

export const CLAIM_FEATURE = 'claim';

export interface StateWithClaim {
  [CLAIM_FEATURE]: ClaimState;
}

export interface FSClaimState {
  claim: ClaimState;
}

export interface ClaimState {
  content: FSUserRequest;
  loaded: boolean;
}
