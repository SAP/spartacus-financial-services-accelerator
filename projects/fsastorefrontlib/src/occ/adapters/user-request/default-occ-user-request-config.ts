import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccUserRequestConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        userRequest: 'users/${userId}/fsUserRequests/${requestId}',
        submitUserRequest: 'users/${userId}/fsUserRequests/${requestId}/action',
      },
    },
  },
};
