import { FSOccConfig } from '../../config/fs-occ-config';

export const defaultCsTicketConfig: FSOccConfig = {
  backend: {
    occ: {
      endpoints: {
        createCsTicket: 'users/${userId}/csTickets',
      },
    },
  },
};
