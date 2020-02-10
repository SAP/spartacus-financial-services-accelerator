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
import { PolicyService } from '../../../core/my-account/services/policy/policy.service';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { AccordionModule } from '../../../shared/accordion/accordion.module';
import { PolicyConnector } from '../../../core/my-account/services/policy';

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
  providers: [PolicyService, PolicyConnector],
  entryComponents: [PoliciesComponent, PolicyDetailsComponent],
})
export class PolicyModule {}
