import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { CmsConfig, ConfigModule, I18nModule, CmsModule, AuthGuard, RoutingConfig, RoutesConfig } from '@spartacus/core';
import { SpinnerModule, PaymentMethodsComponent, PageLayoutComponent, CmsPageGuard } from '@spartacus/storefront';
import { effects } from '../../my-account/assets/store';
import { CMSViewPoliciesComponent } from './view-policies/view-policies.component';
import { CMSViewQuotesComponent } from './view-quotes/view-quotes.component';
import { InboxComponent } from './inbox/inbox.component';
import { InboxTabComponent } from './inbox/inbox-tab/inbox-tab.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'paymentDetails',
      pageLabel: 'payment-details'
    },
    component: PageLayoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    CmsModule,
    I18nModule,
    RouterModule,
    SpinnerModule,
    EffectsModule.forFeature(effects),
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        CMSViewPoliciesComponent: {
          component: CMSViewPoliciesComponent
        },
        CMSViewQuotesComponent: {
          component: CMSViewQuotesComponent
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
          component: PaymentMethodsComponent,
          guards: [AuthGuard]
        }
      },
      routing: {
        routes: {
          paymentDetails: {
            paths: [
              'my-account/payment-details'
            ]
          }
        }
      }
    })
  ],
  declarations: [ CMSViewPoliciesComponent, CMSViewQuotesComponent ],
  exports: [ CMSViewPoliciesComponent, CMSViewQuotesComponent ],
  entryComponents: [ CMSViewPoliciesComponent, CMSViewQuotesComponent ]
})
export class AccountModule {}
