import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CmsPageGuard,
  SpinnerModule,
  PageLayoutComponent,
  ListNavigationModule,
  IconModule,
} from '@spartacus/storefront';
import {
  CmsModule,
  AuthGuard,
  I18nModule,
  CmsConfig,
  provideDefaultConfig,
} from '@spartacus/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardGuard } from './dashboard.guard';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, DashboardGuard],
    data: {
      cxRoute: 'dashboard',
      pageLabel: 'dashboard',
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
    ListNavigationModule,
    IconModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        DashboardFlex: {
          component: DashboardComponent,
        },
      },
    }),
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
})
export class DashboardModule {}
