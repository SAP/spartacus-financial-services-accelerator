import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule, CmsModule } from '@spartacus/storefront';
import { effects } from '../../my-account/assets/store';
import { InboxTabComponent } from './inbox/inbox-tab/inbox-tab.component';
import { InboxComponent } from './inbox/inbox.component';
import { LogoutModule } from './logout/logout.module';
import { CMSViewPoliciesComponent } from './view-policies/view-policies.component';
import { CMSViewQuotesComponent } from './view-quotes/view-quotes.component';


@NgModule({
  imports: [
    CommonModule,
    CmsModule,
    RouterModule,
    LogoutModule,
    EffectsModule.forFeature(effects),
    ComponentsModule
  ],
  declarations: [ CMSViewPoliciesComponent, CMSViewQuotesComponent, InboxComponent, InboxTabComponent],
  exports: [ CMSViewPoliciesComponent, CMSViewQuotesComponent, InboxComponent, InboxTabComponent],
  entryComponents: [ CMSViewPoliciesComponent, CMSViewQuotesComponent, InboxComponent, InboxTabComponent]
})
export class AccountModule { }
