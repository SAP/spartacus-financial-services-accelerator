import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { BREAKPOINT, TableConfig, TableLayout } from '@spartacus/storefront';
// import { UnitAddressRoutePageMetaResolver } from './services/unit-address-route-page-meta.resolver';
// import { UnitRoutePageMetaResolver } from './services/unit-route-page-meta.resolver';
import {
  ItemService,
  ListService,
  AssignCellComponent,
  CellComponent,
  StatusCellComponent,
  UnitCellComponent,
  OrganizationTableType,
  UnitDetailsComponent,
  UnitFormComponent,
  UnitAddressDetailsComponent,
  UnitAddressFormComponent,
  LinkCellComponent,
  UnitAddressListComponent,
  UnitAssignedApproverListComponent,
  UnitApproverListComponent,
  UnitChildCreateComponent,
  UnitChildrenComponent,
  UnitCostCenterListComponent,
  UnitCostCenterCreateComponent,
  UnitUserCreateComponent,
  UnitUserRolesCellComponent,
  UnitUserListComponent,
  UnitUserRolesFormComponent,
  ToggleLinkCellComponent,
  UnitListComponent,
  UnitItemService,
  UnitListService,
} from '@spartacus/organization/administration/components';

export const ROUTE_PARAMS = {
  budgetCode: 'budgetCode',
  unitCode: 'unitCode',
  costCenterCode: 'costCenterCode',
  userCode: 'userCode',
  userGroupCode: 'userGroupCode',
  permissionCode: 'permissionCode',
  addressCode: 'addressId',
};

export const MAX_OCC_INTEGER_VALUE = 2147483647;

const listPath = `organization/units/:${ROUTE_PARAMS.unitCode}`;
const paramsMapping: ParamsMapping = {
  unitCode: 'uid',
  addressId: 'id',
  userCode: 'customerId',
};

export const unitsRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgUnits: {
        paths: ['organization/units'],
      },
      orgUnitCreate: {
        paths: ['organization/units/create'],
      },
      orgUnitDetails: {
        paths: [listPath],
        paramsMapping,
      },
      orgUnitEdit: {
        paths: [`${listPath}/edit`],
        paramsMapping,
      },
      orgUnitChildren: {
        paths: [`${listPath}/children`],
        paramsMapping,
      },
      orgUnitCreateChild: {
        paths: [`${listPath}/children/create`],
        paramsMapping,
      },
      orgUnitUserList: {
        paths: [`${listPath}/users`],
        paramsMapping,
      },
      orgUnitCreateUser: {
        paths: [`${listPath}/users/create`],
        paramsMapping,
      },
      orgUnitUserRoles: {
        paths: [`${listPath}/users/:userCode/roles`],
        paramsMapping,
      },
      orgUnitApprovers: {
        paths: [`${listPath}/approvers`],
        paramsMapping,
      },
      orgUnitAssignApprovers: {
        paths: [`${listPath}/approvers/assign`],
        paramsMapping,
      },
      orgUnitAddressList: {
        paths: [`${listPath}/addresses`],
        paramsMapping,
      },
      orgUnitAddressCreate: {
        paths: [`${listPath}/addresses/create`],
        paramsMapping,
      },
      orgUnitAddressDetails: {
        paths: [`${listPath}/addresses/:addressId`],
        paramsMapping,
      },
      orgUnitAddressEdit: {
        paths: [`${listPath}/addresses/:addressId/edit`],
        paramsMapping,
      },
      orgUnitCostCenters: {
        paths: [`${listPath}/cost-centers`],
        paramsMapping,
      },
      orgUnitCreateCostCenter: {
        paths: [`${listPath}/cost-centers/create`],
        paramsMapping,
      },
    },
  },
};

export const unitsCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageUnitsListComponent: {
      component: UnitListComponent,
      providers: [
        {
          provide: ListService,
          useExisting: UnitListService,
        },
        {
          provide: ItemService,
          useExisting: UnitItemService,
        },
      ],
      childRoutes: {
        parent: {
          data: {
            cxPageMeta: {
              breadcrumb: 'orgUnit.breadcrumbs.list',
              // resolver: UnitRoutePageMetaResolver,
            },
          },
        },
        children: [
          {
            path: 'create',
            component: UnitFormComponent,
          },
          {
            path: `:${ROUTE_PARAMS.unitCode}`,
            component: UnitDetailsComponent,
            data: {
              cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.details' },
            },
            children: [
              {
                path: 'edit',
                component: UnitFormComponent,
              },
              {
                path: 'children',
                component: UnitChildrenComponent,
                data: {
                  cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.children' },
                },
                children: [
                  {
                    path: 'create',
                    component: UnitChildCreateComponent,
                  },
                ],
              },
              {
                path: 'approvers',
                data: {
                  cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.approvers' },
                },
                children: [
                  {
                    path: '',
                    component: UnitAssignedApproverListComponent,
                  },
                  {
                    path: 'assign',
                    component: UnitApproverListComponent,
                  },
                ],
              },
              {
                path: 'users',
                component: UnitUserListComponent,
                data: {
                  cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.users' },
                },
                children: [
                  {
                    path: 'create',
                    component: UnitUserCreateComponent,
                  },
                  {
                    path: `:${ROUTE_PARAMS.userCode}/roles`,
                    component: UnitUserRolesFormComponent,
                  },
                ],
              },
              {
                path: 'cost-centers',
                component: UnitCostCenterListComponent,
                data: {
                  cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.costCenters' },
                },
                children: [
                  {
                    path: 'create',
                    component: UnitCostCenterCreateComponent,
                  },
                ],
              },
              {
                path: 'addresses',
                component: UnitAddressListComponent,
                data: {
                  cxPageMeta: {
                    breadcrumb: 'orgUnit.breadcrumbs.addresses',
                  },
                },
                children: [
                  {
                    path: 'create',
                    component: UnitAddressFormComponent,
                  },
                  {
                    path: `:${ROUTE_PARAMS.addressCode}`,
                    data: {
                      cxPageMeta: {
                        breadcrumb: 'orgUnit.breadcrumbs.addressDetails',
                      },
                    },
                    children: [
                      {
                        path: '',
                        component: UnitAddressDetailsComponent,
                      },
                      {
                        path: 'edit',
                        component: UnitAddressFormComponent,
                      },
                    ],
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

export function unitsTableConfigFactory(): TableConfig {
  return unitsTableConfig;
}

export const unitsTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.UNIT]: {
      cells: ['name'],
      options: {
        layout: TableLayout.VERTICAL,
        cells: {
          name: {
            dataComponent: ToggleLinkCellComponent,
          },
          active: {
            dataComponent: StatusCellComponent,
          },
          uid: {
            dataComponent: CellComponent,
          },
        },
      },
      [BREAKPOINT.lg]: {
        cells: ['name', 'active', 'uid'],
      },
    },
    [OrganizationTableType.UNIT_USERS]: {
      cells: ['name', 'roles'],
      options: {
        cells: {
          roles: {
            dataComponent: UnitUserRolesCellComponent,
          },
        },
      },
    },

    [OrganizationTableType.UNIT_CHILDREN]: {
      cells: ['name', 'active'],
      options: {
        cells: {
          active: {
            dataComponent: StatusCellComponent,
            linkable: false,
          },
        },
      },
    },

    [OrganizationTableType.UNIT_APPROVERS]: {
      cells: ['name', 'orgUnit', 'actions'],
      options: {
        cells: {
          actions: {
            dataComponent: AssignCellComponent,
          },
          orgUnit: {
            dataComponent: UnitCellComponent,
            linkable: false,
          },
        },
      },
    },

    [OrganizationTableType.UNIT_ASSIGNED_APPROVERS]: {
      cells: ['name', 'orgUnit', 'actions'],
      options: {
        cells: {
          actions: {
            dataComponent: AssignCellComponent,
          },
          orgUnit: {
            dataComponent: UnitCellComponent,
            linkable: false,
          },
        },
      },
    },

    [OrganizationTableType.UNIT_COST_CENTERS]: {
      cells: ['name'],
    },

    [OrganizationTableType.UNIT_ADDRESS]: {
      cells: ['formattedAddress'],
      options: {
        cells: {
          formattedAddress: {
            dataComponent: LinkCellComponent,
          },
        },
      },
    },
  },
};
