import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccPolicyConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        policies: 'users/${userId}/policies',
        policy: 'users/${userId}/policies/${policyId}/contracts/${contractId}',
        premiumCalendar: 'users/${userId}/policies/premium-calendar',
      },
    },
  },
};
