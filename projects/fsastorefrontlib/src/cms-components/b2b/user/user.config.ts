import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { TableConfig } from '@spartacus/storefront';
import {
  ItemService,
  ListService,
  ListComponent,
  AssignCellComponent,
  ActiveLinkCellComponent,
  CellComponent,
  RolesCellComponent,
  StatusCellComponent,
  UnitCellComponent,
  OrganizationTableType,
  UserAssignedApproverListComponent,
  UserApproverListComponent,
  UserChangePasswordFormComponent,
  UserFormComponent,
  UserAssignedPermissionListComponent,
  UserPermissionListComponent,
  UserItemService,
  UserListService,
  UserUserGroupListComponent,
  UserAssignedUserGroupListComponent,
} from '@spartacus/organization/administration/components';
import { FSUserDetailsComponent } from './details/user-details.component';

export const USER_ROUTE_PARAMS = {
  budgetCode: 'budgetCode',
  unitCode: 'unitCode',
  costCenterCode: 'costCenterCode',
  userCode: 'userCode',
  userGroupCode: 'userGroupCode',
  permissionCode: 'permissionCode',
  addressCode: 'addressId',
};

// TODO:#my-account-architecture - Number.MAX_VALUE?
export const USER_MAX_OCC_INTEGER_VALUE = 2147483647;

const listPath = `organization/users/:${USER_ROUTE_PARAMS.userCode}`;
const paramsMapping: ParamsMapping = {
  userCode: 'customerId',
};

export const userRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgUser: {
        paths: ['organization/users'],
      },
      orgUserCreate: {
        paths: ['organization/users/create'],
      },
      orgUserDetails: {
        paths: [listPath],
        paramsMapping,
      },
      orgUserEdit: {
        paths: [`${listPath}/edit`],
        paramsMapping,
      },
      orgUserChangePassword: {
        paths: [`${listPath}/change-password`],
        paramsMapping,
      },
      orgUserApprovers: {
        paths: [`${listPath}/approvers`],
        paramsMapping,
      },
      orgUserAssignApprovers: {
        paths: [`${listPath}/approvers/assign`],
        paramsMapping,
      },
      orgUserPermissions: {
        paths: [`${listPath}/purchase-limits`],
        paramsMapping,
      },
      orgUserAssignPermissions: {
        paths: [`${listPath}/purchase-limits/assign`],
        paramsMapping,
      },
      orgUserUserGroups: {
        paths: [`${listPath}/user-groups`],
        paramsMapping,
      },
      orgUserAssignUserGroups: {
        paths: [`${listPath}/user-groups/assign`],
        paramsMapping,
      },
    },
  },
};

export const userCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageUsersListComponent: {
      component: ListComponent,
      providers: [
        {
          provide: ListService,
          useExisting: UserListService,
        },
        {
          provide: ItemService,
          useExisting: UserItemService,
        },
      ],
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
              {
                path: 'user-groups',
                data: {
                  cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.userGroups' },
                },
                children: [
                  {
                    path: '',
                    component: UserAssignedUserGroupListComponent,
                  },
                  {
                    path: 'assign',
                    component: UserUserGroupListComponent,
                  },
                ],
              },
            ],
          },
        ],
      },
      guards: [AuthGuard, AdminGuard],
    },
  },
};

export function userTableConfigFactory(): TableConfig {
  return userTableConfig;
}

const cells = {
  actions: {
    dataComponent: AssignCellComponent,
  },
};
const pagination = {
  pageSize: USER_MAX_OCC_INTEGER_VALUE,
};

export const userTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.USER]: {
      cells: ['name', 'active', 'uid', 'roles', 'unit'],
      options: {
        cells: {
          name: {
            dataComponent: ActiveLinkCellComponent,
          },
          active: {
            dataComponent: StatusCellComponent,
          },
          uid: {
            dataComponent: CellComponent,
          },
          roles: {
            dataComponent: RolesCellComponent,
          },
          unit: {
            dataComponent: UnitCellComponent,
          },
        },
      },
    },
  },
};
