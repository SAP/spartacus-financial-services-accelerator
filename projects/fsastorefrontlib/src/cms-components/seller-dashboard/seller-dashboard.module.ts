import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CmsPageGuard,
  SpinnerModule,
  PageLayoutComponent,
  ListNavigationModule,
  IconModule,
  MediaModule,
  FormErrorsModule,
} from '@spartacus/storefront';
import {
  CmsModule,
  AuthGuard,
  I18nModule,
  CmsConfig,
  provideDefaultConfig,
  UrlModule,
  GlobalMessageService,
} from '@spartacus/core';
import { DateFormatConfigurationModule } from '../../shared/util/helpers/pipe/dateFormatConfiguration.module';
import { SellerDashboardListComponent } from './seller-dashboard-list/seller-dashboard-list.component';
import { SellerDashboardGuard } from './seller-dashboard.guard';
import { SellerDashboardComponent } from './seller-dashboard.component';
import { CreateOBOCustomerComponent } from './create-customer/create-obo-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { CreateOBOCustomerComponentService } from './create-customer/create-obo-customer-component.service';
import { ConsentConnector } from '../../core';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, SellerDashboardGuard],
    data: {
      cxRoute: 'sellerDashboard',
      pageLabel: 'seller-dashboard',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, SellerDashboardGuard],
    data: {
      cxRoute: 'createOBOCustomer',
      pageLabel: 'create-OBOCustomer',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    SpinnerModule,
    CmsModule,
    UrlModule,
    ListNavigationModule,
    MediaModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorsModule,
    DateFormatConfigurationModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    CreateOBOCustomerComponentService,
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SellerDashboardFlex: {
          component: SellerDashboardComponent,
        },
        CreateOBOCustomerComponent: {
          component: CreateOBOCustomerComponent,
          guards: [AuthGuard, SellerDashboardGuard],
          providers: [
            {
              provide: CreateOBOCustomerComponentService,
              useClass: CreateOBOCustomerComponentService,
              deps: [UserProfileFacade, GlobalMessageService, ConsentConnector],
            },
          ],
        },
      },
    }),
  ],
  declarations: [
    SellerDashboardListComponent,
    SellerDashboardComponent,
    CreateOBOCustomerComponent,
  ],
  exports: [
    SellerDashboardListComponent,
    SellerDashboardComponent,
    CreateOBOCustomerComponent,
  ],
})
export class SellerDashboardModule {}
