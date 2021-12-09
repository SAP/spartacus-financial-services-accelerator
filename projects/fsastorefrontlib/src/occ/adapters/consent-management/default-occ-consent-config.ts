import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccConsentConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        oboConsents: 'users/${userId}/oboconsents',
        oboConsentCustomers: 'users/${userId}/oboconsents/customers',
        transferCart: 'users/${userId}/carts/${cartId}/oboconsents/action',
      },
    },
  },
};
