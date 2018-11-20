import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import * as fromPolicyStore from '../../../my-account/applications/store';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';

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
        private changeDetectorRef: ChangeDetectorRef
      ) { }
         
      policies$;
      policiesLoaded$;
    
    public noPoliciesText = 'You have no Policies!';

    ngOnInit()
    {
        console.log("OnInit");
        this.changeDetectorRef.detectChanges();
    }
    
    fetchPolicies() {
        this.policies$ = this.store.pipe(select(fromPolicyStore.getActivePolicies));
        this.policiesLoaded$ = this.store.pipe(select(fromPolicyStore.getPolicyLoaded));
    }

    public getBaseUrl() {
        return this.config.server.baseUrl || '';
    }

}