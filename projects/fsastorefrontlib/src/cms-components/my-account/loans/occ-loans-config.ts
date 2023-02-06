import { OccLoansConfig } from './models/occ-loans-config.model';

export const occLoansConfig: OccLoansConfig = {
  backend: {
    occ: {
      endpoints: {
        loans: 'users/${userId}/ordersByCategory',
      },
    },
  },
};
