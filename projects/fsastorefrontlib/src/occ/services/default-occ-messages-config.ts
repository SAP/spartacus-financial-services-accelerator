import { FSOccConfig } from '../config/fs-occ-config';

export const occMessagesConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        numberOfMessages:
          'users/${userId}/notifications/fssitemessages/numberOfMessages',
      },
    },
  },
};
