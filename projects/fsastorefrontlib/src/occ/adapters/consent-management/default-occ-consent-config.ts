import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccConsentConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        oboConsents: 'users/${userId}/oboconsents',
        oboConsentCustomers: 'users/${userId}/oboconsents/customers',
        oboConsentCustomer:
          'users/${userId}/oboconsents/customers/${customerId}',
        oboConsentCustomerQuotes:
          'users/${userId}/oboconsents/customers/${customerId}/quotes',
        oboConsentCustomerPolicies:
          'users/${userId}/oboconsents/customers/${customerId}/policies',
        oboConsentCustomerClaims:
          'users/${userId}/oboconsents/customers/${customerId}/claims',
      },
    },
  },
};
