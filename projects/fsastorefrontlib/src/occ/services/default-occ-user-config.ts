import { FSOccConfig } from '../config/fs-occ-config';

export const occUserConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        user: 'fsusers/${userId}',
        userRegister: 'fsusers',
        userCloseAccount: 'users/${userId}',
      },
    },
  },
};
