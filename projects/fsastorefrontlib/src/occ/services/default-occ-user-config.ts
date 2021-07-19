import { FSOccConfig } from '../config/fs-occ-config';

export const occUserConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        user: 'users/${userId}',
        userRegister: 'fsusers',
        disableUser: 'users/${userId}',
      },
    },
  },
};
