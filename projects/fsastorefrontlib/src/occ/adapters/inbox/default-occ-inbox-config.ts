import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccInboxConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        siteMessages: 'users/${userId}/notifications/fssitemessages',
        updateMessages:
          'users/${userId}/notifications/fssitemessages/read-unread',
      },
    },
  },
};
