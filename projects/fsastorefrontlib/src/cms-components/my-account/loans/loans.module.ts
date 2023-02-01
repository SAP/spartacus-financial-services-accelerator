import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  provideConfig,
  RoutesConfig,
  RoutingConfig,
} from '@spartacus/core';
import {
  CmsPageGuard,
  PageLayoutComponent,
  PaginationModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { LoansOverviewComponent } from './loans-overview.component';
import { AccordionModule } from '../../../shared/accordion/accordion.module';
import { config } from './loans.config';
import { occLoansConfig } from './occ-loans-config';
import { OccLoansAdapter } from './services/occ-loans.adapter';
import { SortDirective } from './sort.directive';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'myLoans',
      pageLabel: 'my-loans',
    },
    component: PageLayoutComponent,
  },
  // To be determined
  // {
  //   path: null,
  //   canActivate: [AuthGuard, CmsPageGuard],
  //   data: {
  //     cxRoute: 'loansDetails',
  //     pageLabel: 'loans-details',
  //   },
  //   component: PageLayoutComponent,
  // },
];

@NgModule({
  declarations: [SortDirective],
  imports: [
    CommonModule,
    I18nModule,
    ReactiveFormsModule,
    SpinnerModule,
    AccordionModule,
    RouterModule.forChild(routes),
    PaginationModule,
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        AccountMyloansFlexComponent: {
          LoansOverviewComponent,
        },
      },
    }),
  ],
  providers: [OccLoansAdapter, provideConfig(occLoansConfig)],
})
export class LoansModule {}
