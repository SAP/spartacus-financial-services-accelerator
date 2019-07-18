import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SpinnerModule, PageLayoutComponent } from '@spartacus/storefront';
import { AuthGuard, I18nModule, ConfigModule, CmsConfig, RoutesConfig, RoutingConfig } from '@spartacus/core';
import { CmsPageGuard } from '@spartacus/storefront';

import { PoliciesComponent } from '../assets/components/policies/policies.component';
import { PolicyService } from './services/policy.service';
import { PolicyDataService } from './services/policy-data.service';
import { OccPolicyService } from '../../occ/policy/policy.service';


const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'myPoliciesComponent',
      pageLabel: 'my-policies' },
    component: PageLayoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    FormsModule,
    NgSelectModule,
    SpinnerModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig> {
      cmsComponents: {
        AccountMyPoliciesSPAComponent: {
          component: PoliciesComponent
        }
      },
      routing: {
        routes: {
          myPoliciesComponent: {
            paths: [
              'my-account/my-policies'
            ]
          }
        }
      }
    })
  ],
  declarations: [PoliciesComponent],
  exports: [PoliciesComponent],
  providers: [PolicyService, PolicyDataService, OccPolicyService],
  entryComponents: [PoliciesComponent]
})
export class PoliciesModule { }
