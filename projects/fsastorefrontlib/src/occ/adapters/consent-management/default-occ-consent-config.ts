import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccConsentConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        consents: 'users/${userId}/oboconsents',
      },
    },
  },
};
