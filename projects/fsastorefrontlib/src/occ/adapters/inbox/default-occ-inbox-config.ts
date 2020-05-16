import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultOccInboxConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        SiteMessages: 'users/${userId}/notifications/fssitemessages',
        UpdateMessages:
          'users/${userId}/notifications/fssitemessages/read-unread',
      },
    },
  },
};
