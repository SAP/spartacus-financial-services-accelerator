import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { CMSViewPoliciesComponent } from './view-policies/view-policies.component';
import { CMSViewQuotesComponent } from './view-quotes/view-quotes.component';
import { effects } from '../../my-account/assets/store';
import {LogoutModule} from './logout/logout.module';

import { ComponentsModule } from '@spartacus/storefront';
import { ConfigModule, CmsConfig } from '@spartacus/core'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LogoutModule,
    EffectsModule.forFeature(effects),
    ComponentsModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSViewPoliciesComponent: { selector: 'fsa-view-policies' },
        CMSViewQuotesComponent: { selector: 'fsa-view-quotes' }
       }
    }),],
  declarations: [ CMSViewPoliciesComponent, CMSViewQuotesComponent],
  exports: [ CMSViewPoliciesComponent, CMSViewQuotesComponent],
  entryComponents: [ CMSViewPoliciesComponent, CMSViewQuotesComponent]
})
export class AccountModule { }
