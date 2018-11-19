import { Component, ChangeDetectionStrategy, Injectable, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import * as fromPolicyStore from '../../../my-account/applications/store';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'fsa-view-policies',
    templateUrl: './view-policies.component.html',
    styleUrls: ['./view-policies.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class CMSViewPoliciesComponent implements OnInit{

    //component$;
    //title = 'Tour of Heroes';

    constructor(
        protected componentData: CmsComponentData,
        private store: Store<fromPolicyStore.PolicyState>,
        private config: OccConfig,
        private changeDetectorRef: ChangeDetectorRef
      ) {
        //   this.subscription = this.componentData.data$.subscribe(
        //       data => {
        //           this.component$ = data;
        //           console.log(data);
        //       }
        //   )
      }
         
    //   policies$;
    //   policiesLoaded$;
    //   private subscription: Subscription;
    
    public noPoliciesText = 'You have no Policies!';

    ngOnInit()
    {
        console.log("OnInit");
        this.changeDetectorRef.detectChanges();
    }
    
    // fetchPolicies() {
    //     this.policies$ = this.store.pipe(select(fromPolicyStore.getActivePolicies));
    //     this.policiesLoaded$ = this.store.pipe(select(fromPolicyStore.getPolicyLoaded));
    // }

    // ngOnDestroy() {
    //     if (this.subscription) {
    //         this.subscription.unsubscribe();
    //       }      
    //     }


    // public getBaseUrl() {
    //     return this.config.server.baseUrl || '';
    // }

}