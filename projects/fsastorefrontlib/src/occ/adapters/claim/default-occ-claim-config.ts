import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccClaimConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        claims: 'users/${userId}/claims',
        claim: 'users/${userId}/claims/${claimId}',
        createClaim: 'users/${userId}/claims/create',
      },
    },
  },
};
