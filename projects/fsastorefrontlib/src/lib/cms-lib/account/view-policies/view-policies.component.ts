import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import * as fromPolicyStore from '../../../my-account/applications/store';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';
import { PolicyService } from '../../../my-account/applications/services/policy.service';

@Component({
    selector: 'fsa-view-policies',
    templateUrl: './view-policies.component.html',
    styleUrls: ['./view-policies.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class CMSViewPoliciesComponent implements OnInit{

    component$;

    constructor(
        protected componentData: CmsComponentData,
        private store: Store<fromPolicyStore.PolicyState>,
        private config: OccConfig,
        private policyService: PolicyService
    ) { }
         
      policies$;
      policiesLoaded$;
    
    public noPoliciesText = 'You have no Policies!';

    ngOnInit() {
    
        this.policyService.loadPolicies();
        this.policies$ = this.store.pipe(select(fromPolicyStore.getActivePolicies));
        this.policiesLoaded$ = this.store.pipe(select(fromPolicyStore.getPolicyLoaded));
        this.component$ = this.componentData.data$;
      }
    
    public getBaseUrl() {
        return this.config.server.baseUrl || '';
    }

}