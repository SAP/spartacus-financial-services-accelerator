import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { ComponentsModule } from '@spartacus/storefront';
import { CmsConfig, ConfigModule, AuthGuard } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';

import { PoliciesComponent } from '../assets/components/policies/policies.component';
import { PolicyService } from './services/policy.service';
import { PolicyDataService } from './services/policy-data.service';
import { OccPolicyService } from '../../occ/policy/policy.service';


const routes: Routes = [
  {
    path: 'my-account/my-policies',
    canActivate: [AuthGuard, CmsPageGuard],
    data: { pageLabel: 'my-policies' },
    component: PageLayoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountMyPoliciesSPAComponent: { selector: 'fsa-policies' },
      }
    })
  ],
  declarations: [PoliciesComponent],
  exports: [PoliciesComponent],
  providers: [PolicyService, PolicyDataService, OccPolicyService],
  entryComponents: [PoliciesComponent]
})
export class PoliciesModule { }
