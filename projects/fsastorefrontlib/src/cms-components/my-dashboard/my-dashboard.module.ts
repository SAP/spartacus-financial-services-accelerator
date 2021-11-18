import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CmsPageGuard,
  SpinnerModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import {
  CmsModule,
  AuthGuard,
  I18nModule,
  ConfigModule,
  CmsConfig,
  provideDefaultConfig,
} from '@spartacus/core';
import { MyDashboardComponent } from './my-dashboard.component';
import { MyDashboardGuard } from './my-dashboard.guard';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, MyDashboardGuard],
    data: {
      cxRoute: 'myDashboard',
      pageLabel: 'my-dashboard',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SpinnerModule,
    CmsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MyDashboardFlex: {
          component: MyDashboardComponent,
        },
      },
    }),
  ],
  declarations: [MyDashboardComponent],
  exports: [MyDashboardComponent],
})
export class MyDashboardModule {}
