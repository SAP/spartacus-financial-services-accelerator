import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
} from '@spartacus/core';
import { CmsPageGuard } from '@spartacus/storefront';

import { PoliciesComponent } from './policies/policies.component';
import { PolicyService } from '../../../core/my-account/facade/policy.service';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { AccordionModule } from '../../../shared/accordion/accordion.module';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { ChangeRequestStoreModule } from './../../../core/change-request/store/change-request-store.module';
import { DocumentsTableModule } from '../documents/documents-table/documents-table.module';
import { PoliciesChartComponent } from './policies-chart/policies-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

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
    FormsModule,
    NgSelectModule,
    SpinnerModule,
    AccordionModule,
    ChangeRequestStoreModule,
    MediaModule,
    DocumentsTableModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        AccountMyPoliciesChartFlex: {
          component: PoliciesChartComponent,
        },
        AccountMyPoliciesFlex: {
          component: PoliciesComponent,
        },
        AccountPolicyDetailsFlex: {
          component: PolicyDetailsComponent,
        },
      },
    }),
  ],
  declarations: [PoliciesComponent, PolicyDetailsComponent, PoliciesChartComponent],
  exports: [PoliciesComponent, PolicyDetailsComponent, PoliciesChartComponent],
  providers: [PolicyService, ChangeRequestService],
  entryComponents: [PoliciesComponent, PolicyDetailsComponent, PoliciesChartComponent],
})
export class PolicyModule {}
