import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import {
  ItemService,
  ListService,
  UnitChildCreateComponent,
  UnitChildrenComponent,
  UnitFormComponent,
  UnitItemService,
  UnitListComponent,
  UnitListService,
  UnitUserListComponent,
  UnitUserRolesFormComponent,
} from '@spartacus/organization/administration/components';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { TableConfig, TableDataCellComponent } from '@spartacus/storefront';
import { ProductAssignmentsComponent } from './assignments';
import { AssignProductCellComponent } from './potential-assignments/cells/assign-product-cell/assign-product-cell.component';
import { PotentialAssignmentsComponent } from './potential-assignments/potential-assignments.component';
import { ActivateProductCellComponent } from './assignments/cells/activate-product-cell/activate-product-cell.component';
import { RemoveProductCellComponent } from './assignments/cells/remove-product-cell/remove-product-cell.component';
import { FSUnitDetailsComponent } from './details';
import { OrganizationTableType } from '../../../occ';
import { FSUnitUserCreateComponent } from '../user/create/unit-user-create.component';

export const MAX_OCC_INTEGER_VALUE = 2147483647;

export const ROUTE_PARAMS = {
  budgetCode: 'budgetCode',
  unitCode: 'unitCode',
  costCenterCode: 'costCenterCode',
  userCode: 'userCode',
  userGroupCode: 'userGroupCode',
  permissionCode: 'permissionCode',
};

const listPath = `organization/units/:${ROUTE_PARAMS.unitCode}`;

const paramsMapping: ParamsMapping = {
  unitCode: 'uid',
  userCode: 'customerId',
};

export const unitsRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
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
            component: FSUnitDetailsComponent,
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
                    component: FSUnitUserCreateComponent,
                  },
                  {
                    path: `:${ROUTE_PARAMS.userCode}/roles`,
                    component: UnitUserRolesFormComponent,
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
                    component: ProductAssignmentsComponent,
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
    [OrganizationTableType.PRODUCT_ASSIGNMENTS]: {
      cells: ['name', 'activate', 'remove'],
      options: {
        pagination: { pageSize: 7 },
        cells: {
          name: {
            dataComponent: TableDataCellComponent,
          },
          activate: {
            dataComponent: ActivateProductCellComponent,
          },
          remove: {
            dataComponent: RemoveProductCellComponent,
          },
        },
      },
    },
    [OrganizationTableType.POTENTIAL_PRODUCT_ASSIGNMENTS]: {
      cells: ['name', 'add'],
      options: {
        pagination: { pageSize: 7 },
        cells: {
          add: {
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
