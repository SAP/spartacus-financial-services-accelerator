import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { CmsConfig, ConfigModule, I18nModule, CmsModule, AuthGuard } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { effects } from '../../my-account/assets/store';
import { CMSViewPoliciesComponent } from './view-policies/view-policies.component';
import { CMSViewQuotesComponent } from './view-quotes/view-quotes.component';
import { InboxComponent } from './inbox/inbox.component';
import { InboxTabComponent } from './inbox/inbox-tab/inbox-tab.component';
import { PaymentDetailsComponent } from '../../checkout/assets/components/payment-details/payment-details.component';

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
        CMSViewPoliciesComponent: {
          component: CMSViewPoliciesComponent,
        },
        CMSViewQuotesComponent: {
          component: CMSViewQuotesComponent,
        },
        CMSInboxComponent: {
          component: InboxComponent,
          guards: [AuthGuard]
        },
        CMSInboxTabComponent: {
          component: InboxTabComponent,
          guards: [AuthGuard]
        },
        AccountPaymentDetailsSPAComponent: {
          component: PaymentDetailsComponent,
          guards: [AuthGuard]
        }
      }
    })
  ],
  declarations: [ CMSViewPoliciesComponent, CMSViewQuotesComponent ],
  exports: [ CMSViewPoliciesComponent, CMSViewQuotesComponent ],
  entryComponents: [ CMSViewPoliciesComponent, CMSViewQuotesComponent ]
})
export class AccountModule {}
