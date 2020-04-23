import { OccConfig } from '@spartacus/core';

export const occUserConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        // tslint:disable:max-line-length
        user: 'fsusers/${userId}',
        userRegister: 'fsusers',
      },
    },
  },
};
