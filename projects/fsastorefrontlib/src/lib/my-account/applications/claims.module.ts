import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClaimsComponent } from './components/claims/claims.component';
import { DeleteClaimDialogComponent } from './components/claims/delete-claim-dialog/delete-claim-dialog.component';
import { effects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { reducerProvider, reducerToken } from './store/reducers';
import { ClaimsService } from './services/claims.service';
import { ClaimDataService } from './services/claim-data.service';
import { StoreModule } from '@ngrx/store';
import { metaReducers } from 'projects/storefrontlib/src/lib/checkout/store';
import { BootstrapModule } from 'projects/storefrontlib/src/lib/bootstrap.module';
import { OccClaimService } from '../../occ/claim/claim.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    BootstrapModule,
    StoreModule.forFeature('claim', reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  declarations: [ClaimsComponent, DeleteClaimDialogComponent],
  entryComponents: [DeleteClaimDialogComponent],
  exports: [ClaimsComponent],
  providers: [reducerProvider, ClaimsService, ClaimDataService, OccClaimService]
})
export class ClaimsModule {}
