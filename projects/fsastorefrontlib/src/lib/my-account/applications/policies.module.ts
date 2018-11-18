import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PoliciesComponent } from './components/policies/policies.component';
import { policyReducerProvider, policyReducerToken } from './store/reducers';
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
    EffectsModule.forFeature(effects)
  ],
  declarations: [PoliciesComponent],
  exports: [PoliciesComponent],
  providers: [policyReducerProvider, PolicyService, PolicyDataService, OccPolicyService]
})
export class PoliciesModule { }
