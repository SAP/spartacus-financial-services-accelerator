import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { CmsConfig, ConfigModule, I18nModule, CmsModule, AuthGuard, RoutingConfig, RoutesConfig } from '@spartacus/core';
import {
  SpinnerModule,
  PageLayoutComponent,
  CmsPageGuard,
  PaymentMethodsComponent,
  UpdateProfileComponent,
  ConsentManagementComponent,
  UpdatePasswordComponent,
  UpdateEmailComponent,
  CloseAccountComponent
} from '@spartacus/storefront';
import { effects } from '../../my-account/assets/store';
import { CMSViewPoliciesComponent } from './view-policies/view-policies.component';
import { CMSViewQuotesComponent } from './view-quotes/view-quotes.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'paymentDetails',
      pageLabel: 'payment-details'
    },
    component: PageLayoutComponent
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'consentManagment',
      pageLabel: 'consents'
    },
    component: PageLayoutComponent
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'personalDetails',
      pageLabel: 'fs-update-profile'
    },
    component: PageLayoutComponent
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'updateEmail',
      pageLabel: 'update-email'
    },
    component: PageLayoutComponent
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'updatePasswordComp',
      pageLabel: 'updatePassword'
    },
    component: PageLayoutComponent
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'closeAccount',
      pageLabel: 'close-account'
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
        AccountPaymentDetailsSPAComponent: {
          component: PaymentMethodsComponent
        },
        ConsentManagementComponent: {
          component: ConsentManagementComponent
        },
        UpdateProfileSPAComponent: {
          component: UpdateProfileComponent
        },
        UpdateEmailComponent: {
          component: UpdateEmailComponent
        },
        UpdatePasswordComponent: {
          component: UpdatePasswordComponent
        },
        AccountCloseAccountSPAComponent: {
          component: CloseAccountComponent
        }
      },
      routing: {
        routes: {
          paymentDetails: {
            paths: ['my-account/payment-details']
          },
          consentManagment: {
            paths: ['my-account/consents']
          },
          personalDetails: {
            paths: ['my-account/fs-update-profile']
          },
          updateEmail: {
            paths: ['my-account/update-email']
          },
          updatePasswordComp: {
            paths: ['my-account/update-password']
          },
          closeAccount: {
            paths: ['my-account/close-account']
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
