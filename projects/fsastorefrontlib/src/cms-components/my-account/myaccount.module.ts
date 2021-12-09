import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  CmsModule,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { UserRequestStoreModule } from '../../core/user-request/store/user-request-store.module';
import { FSAddressBookModule } from './address-info';
import { ClaimModule } from './claim/claim.module';
import { DocumentModule } from './documents';
import { FSOrderModule } from './order';
import { PolicyModule } from './policy/policy.module';
import { PremiumCalendarModule } from './premium-calendar/premium-calendar.module';
import { QuoteModule } from './quote/quote.module';
import { UpdateProfileModule } from './update-profile/update-profile.module';
import { FSUpdateProfileComponent } from './update-profile/update-profile.component';
import { FSConsentManagementComponent } from './consent-management/consent-management.component';
import { FSConsentManagementModule } from './consent-management/consent-management.module';

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
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'addressInfo',
      pageLabel: 'address-info',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'myDocuments',
      pageLabel: 'my-documents',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    CmsModule,
    I18nModule,
    UpdateProfileModule,
    PolicyModule,
    QuoteModule,
    FSConsentManagementModule,
    ClaimModule,
    PremiumCalendarModule,
    FSAddressBookModule,
    DocumentModule,
    UserRequestStoreModule,
    RouterModule.forChild(routes),
    FSOrderModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UpdateProfileComponent: {
          component: FSUpdateProfileComponent,
        },
        ConsentManagementComponent: {
          component: FSConsentManagementComponent,
        },
      },
    }),
  ],
})
export class MyAccountModule {}
