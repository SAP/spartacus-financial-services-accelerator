import { NgModule } from '@angular/core';
import { CMSViewPoliciesComponent } from './view-policies/view-policies.component';
import { CMSViewQuotesComponent } from './view-quotes/view-quotes.component';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects } from '../../my-account/applications/store';
import { policyReducerToken, policyReducerProvider } from '../../my-account/applications/store/reducers';
import { PolicyService } from '../../my-account/applications/services/policy.service';
import { PolicyDataService } from '../../my-account/applications/services/policy-data.service';
import { OccPolicyService } from '../../occ/policy/policy.service';

@NgModule({
  imports:[
    CommonModule, 
    RouterModule,
    StoreModule.forFeature('policy', policyReducerToken),
    EffectsModule.forFeature(effects)
  ],
  declarations: [ CMSViewPoliciesComponent, CMSViewQuotesComponent],
  exports: [ CMSViewPoliciesComponent, CMSViewQuotesComponent],
  entryComponents: [ CMSViewPoliciesComponent, CMSViewQuotesComponent],
  providers: [policyReducerProvider, PolicyService, PolicyDataService, OccPolicyService]
})
export class AccountModule { }