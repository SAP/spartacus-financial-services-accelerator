import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { CmsComponentData } from '@spartacus/storefront';
import { OccConfig, AuthService} from '@spartacus/core';

import { PolicyService } from '../../../my-account/assets/services/policy.service';
import * as fromUserStore from '../../../my-account/assets/store';
import {CmsViewPoliciesComponent} from './../../../occ-models/cms-component.models';


@Component({
    selector: 'fsa-view-policies',
    templateUrl: './view-policies.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class CMSViewPoliciesComponent implements OnInit {

    constructor(
        protected componentData: CmsComponentData<CmsViewPoliciesComponent>,
        private store: Store<fromUserStore.UserState>,
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
        this.authService.getUserToken().subscribe(token => {
            if (token.userId !== undefined) {
                this.policyService.loadPolicies();
                this.policies$ = this.store.pipe(select(fromUserStore.getPolicyData));
                this.policiesLoaded$ = this.store.pipe(select(fromUserStore.getPoliciesLoaded));
            } else {
                this.anonymous$ = true;
            }
        }
        );
        this.component$ = this.componentData.data$;
        this.policyButtonText = this.textAllPolicies$;
    }
    public getBaseUrl() {
        return this.config.backend.occ.baseUrl || '';
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
