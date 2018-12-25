import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { ClaimsComponent } from './components/claims/claims.component';
import { DeleteClaimDialogComponent } from '../assets/components/claims/delete-claim-dialog/delete-claim-dialog.component';
import { ClaimService } from './services/claim.service';
import { ClaimDataService } from './services/claim-data.service';
import { OccClaimService } from '../../occ/claim/claim.service';

import { ComponentsModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    ComponentsModule
  ],
  declarations: [ClaimsComponent, DeleteClaimDialogComponent],
  entryComponents: [DeleteClaimDialogComponent],
  exports: [ClaimsComponent],
  providers: [ClaimService, ClaimDataService, OccClaimService]
})
export class ClaimsModule {}
