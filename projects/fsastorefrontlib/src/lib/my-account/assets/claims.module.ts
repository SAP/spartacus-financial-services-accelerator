import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard, I18nModule, ConfigModule, CmsConfig, RoutesConfig, RoutingConfig } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';

import { ClaimsComponent } from './components/claims/claims.component';
import { DeleteClaimDialogComponent } from '../assets/components/claims/delete-claim-dialog/delete-claim-dialog.component';
import { ClaimService } from './services/claim.service';
import { ClaimDataService } from './services/claim-data.service';
import { OccClaimService } from '../../occ/claim/claim.service';

import { SpinnerModule } from '@spartacus/storefront';
import { ClaimActivePoliciesComponent } from './components/claims/claim-policies/claim-active-policies.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'claims',
      pageLabel: 'my-claims'
    },
    component: PageLayoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    SpinnerModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig> {
      cmsComponents: {
        AccountMyClaimsSPAComponent: {
          component: ClaimsComponent
        },
        ClaimActivePoliciesFlex: {
          component: ClaimActivePoliciesComponent
        }
      }
    })
  ],
  declarations: [ClaimsComponent, DeleteClaimDialogComponent, ClaimActivePoliciesComponent],
  exports: [ClaimsComponent, ClaimActivePoliciesComponent],
  providers: [ClaimService, ClaimDataService, ClaimActivePoliciesComponent, OccClaimService],
  entryComponents: [ClaimsComponent, DeleteClaimDialogComponent, ClaimActivePoliciesComponent]
})
export class ClaimsModule {}
