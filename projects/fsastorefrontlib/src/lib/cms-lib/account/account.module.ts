import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { CMSViewPoliciesComponent } from './view-policies/view-policies.component';
import { CMSViewQuotesComponent } from './view-quotes/view-quotes.component';
import { InboxComponent } from './inbox/inbox.component';
import { effects } from '../../my-account/assets/store';
import {LogoutModule} from './logout/logout.module';


import { ComponentsModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LogoutModule,
    EffectsModule.forFeature(effects),
    ComponentsModule
  ],
  declarations: [ CMSViewPoliciesComponent, CMSViewQuotesComponent, InboxComponent],
  exports: [ CMSViewPoliciesComponent, CMSViewQuotesComponent, InboxComponent],
  entryComponents: [ CMSViewPoliciesComponent, CMSViewQuotesComponent, InboxComponent]
})
export class AccountModule { }
