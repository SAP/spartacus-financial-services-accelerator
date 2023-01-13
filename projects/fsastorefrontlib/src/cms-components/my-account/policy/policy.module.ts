import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import {
  SpinnerModule,
  PageLayoutComponent,
  MediaModule,
} from '@spartacus/storefront';
import {
  AuthGuard,
  I18nModule,
  ConfigModule,
  CmsConfig,
  RoutesConfig,
  RoutingConfig,
  UrlModule,
} from '@spartacus/core';
import { CmsPageGuard } from '@spartacus/storefront';
import { PoliciesComponent } from './policies/policies.component';
import { PolicyService } from '../../../core/my-account/facade/policy.service';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { AccordionModule } from '../../../shared/accordion/accordion.module';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { ChangeRequestStoreModule } from './../../../core/change-request/store/change-request-store.module';
import { DocumentsTableModule } from '../documents/documents-table/documents-table.module';
import { PoliciesChartModule } from './policies-chart/policies-chart.module';
import { GenericSyncPilotModule } from '../../sync-pilot/generic-sync-pilot/generic-sync-pilot.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'policies',
      pageLabel: 'my-policies',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'policyDetails',
      pageLabel: 'policy-details',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    UrlModule,
    NgSelectModule,
    SpinnerModule,
    AccordionModule,
    ChangeRequestStoreModule,
    MediaModule,
    DocumentsTableModule,
    PoliciesChartModule,
    GenericSyncPilotModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        AccountMyPoliciesFlex: {
          component: PoliciesComponent,
        },
        AccountPolicyDetailsFlex: {
          component: PolicyDetailsComponent,
        },
      },
    }),
  ],
  declarations: [PoliciesComponent, PolicyDetailsComponent],
  exports: [PoliciesComponent, PolicyDetailsComponent],
  providers: [PolicyService, ChangeRequestService],
})
export class PolicyModule {}
