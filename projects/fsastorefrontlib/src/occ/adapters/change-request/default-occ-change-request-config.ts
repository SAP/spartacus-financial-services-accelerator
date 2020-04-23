import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccChangeRequestConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        changeRequest: 'users/${userId}/fsChangeRequests/${requestId}',
        createChangeRequest: 'users/${userId}/fsChangeRequests',
        simulateChangeRequest:
          'users/${userId}/fsChangeRequests/${requestId}/simulation',
        cancelChangeRequest:
          'users/${userId}/fsChangeRequests/${requestId}/action',
      },
    },
  },
};
