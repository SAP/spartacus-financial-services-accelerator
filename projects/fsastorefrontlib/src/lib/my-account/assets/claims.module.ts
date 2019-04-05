import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CmsConfig, ConfigModule, AuthGuard } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';

import { ClaimsComponent } from './components/claims/claims.component';
import { DeleteClaimDialogComponent } from '../assets/components/claims/delete-claim-dialog/delete-claim-dialog.component';
import { ClaimService } from './services/claim.service';
import { ClaimDataService } from './services/claim-data.service';
import { OccClaimService } from '../../occ/claim/claim.service';

import { ComponentsModule } from '@spartacus/storefront';

const routes: Routes = [
  {
    path: 'my-account/my-insurance-claims',
    canActivate: [AuthGuard, CmsPageGuard],
    component: PageLayoutComponent,
    data: { pageLabel: 'my-claims' }
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
        AccountMyClaimsSPAComponent: { selector: 'fsa-claims' },
      }
    })
  ],
  declarations: [ClaimsComponent, DeleteClaimDialogComponent],
  exports: [ClaimsComponent],
  providers: [ClaimService, ClaimDataService, OccClaimService],
  entryComponents: [ClaimsComponent, DeleteClaimDialogComponent]
})
export class ClaimsModule {}
