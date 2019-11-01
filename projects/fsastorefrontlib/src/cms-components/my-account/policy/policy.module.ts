import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SpinnerModule, PageLayoutComponent } from '@spartacus/storefront';
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
import { PolicyService } from '../../../core/my-account/services/policy.service';
import { PolicyDataService } from '../../../core/my-account/services/policy-data.service';
import { OccPolicyService } from '../../../occ/services/policy/policy.service';
import { CMSViewPoliciesComponent } from './view-policies/view-policies.component';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { AccordionModule } from '../../../shared/accordion/accordion.module';

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
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        AccountMyPoliciesSPAComponent: {
          component: PoliciesComponent,
        },
        CMSViewPoliciesComponent: {
          component: CMSViewPoliciesComponent,
        },
        AccountPolicyDetailsSPAComponent: {
          component: PolicyDetailsComponent,
        },
      },
    }),
  ],
  declarations: [
    PoliciesComponent,
    CMSViewPoliciesComponent,
    PolicyDetailsComponent,
  ],
  exports: [
    PoliciesComponent,
    CMSViewPoliciesComponent,
    PolicyDetailsComponent,
  ],
  providers: [PolicyService, PolicyDataService, OccPolicyService],
  entryComponents: [
    PoliciesComponent,
    CMSViewPoliciesComponent,
    PolicyDetailsComponent,
  ],
})
export class PolicyModule {}
