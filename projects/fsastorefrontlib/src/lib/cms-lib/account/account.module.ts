import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { CmsModule, ComponentsModule } from '@spartacus/storefront';
import { effects } from '../../my-account/assets/store';
import { CMSViewPoliciesComponent } from './view-policies/view-policies.component';
import { CMSViewQuotesComponent } from './view-quotes/view-quotes.component';
import {
  I18nModule
} from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    CmsModule,
    RouterModule,
    I18nModule,
    EffectsModule.forFeature(effects),
    ComponentsModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSViewPoliciesComponent: { selector: 'fsa-view-policies' },
        CMSViewQuotesComponent: { selector: 'fsa-view-quotes' },
        CMSInboxComponent: { selector: 'fsa-inbox' },
        CMSInboxTabComponent: { selector: 'fsa-inbox-tab' },
        AccountPaymentDetailsSPAComponent: {selector : 'cx-payment-methods'}
      }
    })
  ],
  declarations: [ CMSViewPoliciesComponent, CMSViewQuotesComponent ],
  exports: [ CMSViewPoliciesComponent, CMSViewQuotesComponent ],
  entryComponents: [ CMSViewPoliciesComponent, CMSViewQuotesComponent ]
})
export class AccountModule {}
