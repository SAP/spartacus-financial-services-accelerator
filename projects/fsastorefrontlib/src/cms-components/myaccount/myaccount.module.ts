import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  CmsModule,
  AuthGuard,
  RoutingConfig,
  RoutesConfig,
} from '@spartacus/core';
import {
  PageLayoutComponent,
  CmsPageGuard,
  PaymentMethodsComponent,
  ConsentManagementComponent,
  UpdatePasswordComponent,
  UpdateEmailComponent,
  CloseAccountComponent,
} from '@spartacus/storefront';
import { FSUpdateProfileComponent } from './update-profile/fs-update-profile.component';
import { FSRegisterComponent } from './register/fs-register.component';
import { FSUpdateProfileModule } from './update-profile/fs-update-profile.module';
import { FSRegisterModule } from './register/fs-register.module';


const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'paymentDetails',
      pageLabel: 'payment-details',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'orderHistory',
      pageLabel: 'orders',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'accountOverview',
      pageLabel: 'account-overview',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'consentManagment',
      pageLabel: 'consents',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'personalDetails',
      pageLabel: 'fs-update-profile',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'updateEmail',
      pageLabel: 'update-email',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'updatePasswordComp',
      pageLabel: 'updatePassword',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'closeAccount',
      pageLabel: 'close-account',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    CmsModule,
    I18nModule,
    FSUpdateProfileModule,
    FSRegisterModule,
    RouterModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        AccountPaymentDetailsSPAComponent: {
          component: PaymentMethodsComponent,
        },
        ConsentManagementComponent: {
          component: ConsentManagementComponent,
        },
        UpdateEmailComponent: {
          component: UpdateEmailComponent,
        },
        UpdatePasswordComponent: {
          component: UpdatePasswordComponent,
        },
        AccountCloseAccountSPAComponent: {
          component: CloseAccountComponent,
        },
      },
    }),
  ],

})
export class MyAccountModule {}
