import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccMyDashboardConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        oboConsents: 'users/${userId}/oboconsents',
        oboConsentCustomers: 'users/${userId}/oboconsents/customers',
      },
    },
  },
};
