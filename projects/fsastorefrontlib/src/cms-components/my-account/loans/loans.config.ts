import { AuthGuard, CMSComponentConfig } from '@spartacus/core';

const cmsComponents: CMSComponentConfig = {
    AccountMyloansFlexComponent: {
    component: () =>
      import('./loans-overview.component').then(m => m.LoansOverviewComponent),
    guards: [AuthGuard],
  },
};

export const config = {
  cmsComponents,
};
