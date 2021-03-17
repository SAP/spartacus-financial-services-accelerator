import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import {
  CellComponent,
  ItemService,
  ListService,
  OrganizationTableType,
  StatusCellComponent,
  ToggleLinkCellComponent,
  UnitChildCreateComponent,
  UnitChildrenComponent,
  UnitCostCenterCreateComponent,
  UnitCostCenterListComponent,
  UnitDetailsComponent,
  UnitFormComponent,
  UnitItemService,
  UnitListComponent,
  UnitListService,
  UnitUserCreateComponent,
  UnitUserListComponent,
  UnitUserRolesCellComponent,
  UnitUserRolesFormComponent,
} from '@spartacus/organization/administration/components';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { BREAKPOINT, TableConfig, TableLayout } from '@spartacus/storefront';
import { AssignmentsComponent } from './unit/assignments';
import { AssignProductCellComponent } from './unit/potential-assignments/cells/assign-product-cell/assign-product-cell.component';
import { PotentialAssignmentsComponent } from './unit/potential-assignments/potential-assignments.component';
import { ActivateProductCellComponent } from './unit/assignments/cells/activate-product-cell/activate-product-cell.component';
import { RemoveProductCellComponent } from './unit/assignments/cells/remove-product-cell/remove-product-cell.component';

export const MAX_OCC_INTEGER_VALUE = 2147483647;

export const ROUTE_PARAMS = {
  budgetCode: 'budgetCode',
  unitCode: 'unitCode',
  costCenterCode: 'costCenterCode',
  userCode: 'userCode',
  userGroupCode: 'userGroupCode',
  permissionCode: 'permissionCode',
  addressCode: 'addressId',
};

const listPath = `organization/units/:${ROUTE_PARAMS.unitCode}`;

const paramsMapping: ParamsMapping = {
  unitCode: 'uid',
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
      orgUnitProductAssignment: {
        paths: [`${listPath}/unitProductAssignments`],
        paramsMapping,
      },
      orgUnitProductAssign: {
        paths: [`${listPath}/unitProductAssignments/assign`],
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
                path: 'unitProductAssignments',
                data: {
                  cxPageMeta: {
                    breadcrumb: 'orgUnit.breadcrumbs.productAssignment',
                  },
                },
                children: [
                  {
                    path: '',
                    component: AssignmentsComponent,
                    children: [
                      {
                        path: 'assign',
                        component: PotentialAssignmentsComponent,
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

export const unitsTableConfigFactory: TableConfig = {
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
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
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
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
        cells: {
          active: {
            dataComponent: StatusCellComponent,
            linkable: false,
          },
        },
      },
    },
    [OrganizationTableType.UNIT_COST_CENTERS]: {
      cells: ['name', 'activate', 'deassign'],
      options: {
        cells: {
          activate: {
            dataComponent: ActivateProductCellComponent,
          },
          deassign: {
            dataComponent: RemoveProductCellComponent,
          },
        },
      },
    },
    [OrganizationTableType.COST_CENTER_BUDGETS]: {
      cells: ['name', 'assign'],
      options: {
        cells: {
          assign: {
            dataComponent: AssignProductCellComponent,
          },
        },
      },
    },
  },
};

export function unitsTableConfigFactoryFactory(): TableConfig {
  return unitsTableConfigFactory;
}
