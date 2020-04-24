import { OccConfig } from '@spartacus/core';

export const occUserConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        user: 'fsusers/${userId}',
        userRegister: 'fsusers',
      },
    },
  },
};
