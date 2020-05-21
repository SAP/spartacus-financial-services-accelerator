import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccBillingTimeConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        billingTime: '/billing-times',
      },
    },
  },
};
