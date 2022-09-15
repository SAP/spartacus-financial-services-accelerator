import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccConsentConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        oboConsents: 'users/${userId}/oboconsents',
        oboConsentCustomers: 'users/${userId}/oboconsents/customers',
        oboConsentCustomer:
          'users/${userId}/oboconsents/customers/${customerId}',
        transferCart: 'users/${userId}/carts/${cartId}/oboconsents/action',
        oboConsentAddresses:
          'users/${userId}/oboconsents/customers/${oboCustomerId}/addresses',
        oboUpdatePermission: 'users/${userId}/oboconsents/customers/permission',
        oboConsentUpdateAddress:
          'users/${userId}/oboconsents/customers/${oboCustomerId}/addresses/${addressId}',
      },
    },
  },
};
