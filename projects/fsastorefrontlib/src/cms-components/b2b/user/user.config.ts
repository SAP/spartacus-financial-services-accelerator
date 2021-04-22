import { AuthGuard, CmsConfig } from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import {
  UserChangePasswordFormComponent,
  UserFormComponent,
} from '@spartacus/organization/administration/components';
import { FSUserDetailsComponent } from './details/user-details.component';

export const USER_ROUTE_PARAMS = {
  userCode: 'userCode',
};

export const userCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageUsersListComponent: {
      childRoutes: {
        parent: {
          data: {
            cxPageMeta: {
              breadcrumb: 'orgUser.breadcrumbs.list',
            },
          },
        },
        children: [
          {
            path: 'create',
            component: UserFormComponent,
          },
          {
            path: `:${USER_ROUTE_PARAMS.userCode}`,
            component: FSUserDetailsComponent,
            data: {
              cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.details' },
            },
            children: [
              {
                path: `edit`,
                component: UserFormComponent,
              },
              {
                path: `change-password`,
                component: UserChangePasswordFormComponent,
              },
            ],
          },
        ],
      },
      guards: [AuthGuard, AdminGuard],
    },
  },
};
