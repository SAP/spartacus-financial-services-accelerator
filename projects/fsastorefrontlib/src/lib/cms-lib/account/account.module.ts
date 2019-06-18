import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { CmsConfig, ConfigModule, I18nModule, CmsModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { effects } from '../../my-account/assets/store';
import { CMSViewPoliciesComponent } from './view-policies/view-policies.component';
import { CMSViewQuotesComponent } from './view-quotes/view-quotes.component';

@NgModule({
  imports: [
    CommonModule,
    CmsModule,
    I18nModule,
    RouterModule,
    EffectsModule.forFeature(effects),
    SpinnerModule,
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
