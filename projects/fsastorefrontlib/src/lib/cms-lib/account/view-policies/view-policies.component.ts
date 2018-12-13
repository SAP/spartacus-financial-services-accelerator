import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import * as fromPolicyStore from '../../../my-account/applications/store';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';
import { PolicyService } from '../../../my-account/applications/services/policy.service';
import {AuthService} from '@spartacus/storefront';

@Component({
    selector: 'fsa-view-policies',
    templateUrl: './view-policies.component.html',
    styleUrls: ['./view-policies.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class CMSViewPoliciesComponent implements OnInit {

    constructor(
        protected componentData: CmsComponentData,
        private store: Store<fromPolicyStore.PolicyState>,
        private config: OccConfig,
        private policyService: PolicyService,
        protected authService: AuthService
    ) { }

    component$;
    policies$;
    policiesLoaded$;
    anonymous$ = false;

    textAllPolicies$ = 'Show all policies';
    textLessPolicies$ = 'Show less policies';
    policyButtonText;

    allPoliciesDisplayed$ = false;

    ngOnInit() {
        this.authService.userToken$.subscribe(token => {
            if (token.userId !== undefined) {
                this.policyService.loadPolicies();
                this.policies$ = this.store.pipe(select(fromPolicyStore.getActivePolicies));
                this.policiesLoaded$ = this.store.pipe(select(fromPolicyStore.getPolicyLoaded));
            } else {
                this.anonymous$ = true;
            }
        }
        );
        this.component$ = this.componentData.data$;
        this.policyButtonText = this.textAllPolicies$;
    }
    public getBaseUrl() {
        return this.config.server.baseUrl || '';
    }

    public showAllPolicies(showAll) {
        this.allPoliciesDisplayed$ = showAll;
        if (showAll) {
            this.policyButtonText = this.textLessPolicies$;
        } else {
            this.policyButtonText = this.textAllPolicies$;
        }
    }
}
