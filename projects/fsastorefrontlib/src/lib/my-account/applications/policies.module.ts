import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PoliciesComponent } from './components/policies/policies.component';
import { PolicyDetailsComponent } from './components/policy-details/policy-details.component';
import { policyReducerProvider, policyReducerToken, policyDetailsReducerProvider, policyDetailsReducerToken } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { PolicyService } from './services/policy.service';
import { PolicyDataService } from './services/policy-data.service';
import { OccPolicyService } from '../../occ/policy/policy.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    StoreModule.forFeature('policy', policyReducerToken),
    StoreModule.forFeature('policydetails', policyDetailsReducerToken),
    EffectsModule.forFeature(effects)
  ],
  declarations: [PoliciesComponent,PolicyDetailsComponent],
  exports: [PoliciesComponent, PolicyDetailsComponent],
  providers: [policyReducerProvider, policyDetailsReducerProvider, PolicyService, PolicyDataService, OccPolicyService]
})
export class PoliciesModule { }
