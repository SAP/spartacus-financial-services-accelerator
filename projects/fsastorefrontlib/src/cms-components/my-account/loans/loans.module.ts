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
} from '@spartacus/core';
import {
  CmsPageGuard,
  MediaModule,
  PageLayoutComponent,
  PaginationModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { LoansOverviewComponent } from './loans-overview.component';
import { AccordionModule } from '../../../shared/accordion/accordion.module';
import { occLoansConfig } from './occ-loans-config';
import { OccLoansAdapter } from './services/occ-loans.adapter';

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
  declarations: [LoansOverviewComponent],
  imports: [
    CommonModule,
    I18nModule,
    ReactiveFormsModule,
    SpinnerModule,
    AccordionModule,
    RouterModule.forChild(routes),
    PaginationModule,
    MediaModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountMyLoansFlex: {
          component: LoansOverviewComponent,
        },
      },
    }),
  ],
  exports: [LoansOverviewComponent],
  providers: [OccLoansAdapter, provideConfig(occLoansConfig)],
})
export class LoansModule {}
