import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookOfBussinesComponent } from './book-of-bussines/book-of-bussines.component';
import { SearchCustomersComponent } from './search-customers/search-customers.component';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { Routes, RouterModule } from '@angular/router';
import { ConfigModule, CmsConfig, UrlModule } from '@spartacus/core';

import { TableModule } from '@fundamental-ngx/core';
import { LayoutGridModule } from '@fundamental-ngx/core';
import { PanelModule } from '@fundamental-ngx/core';
import { InputGroupModule } from '@fundamental-ngx/core';
import { FormModule } from '@fundamental-ngx/core';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard],
    data: {
      cxRoute: 'agentDashboard',
      pageLabel: 'dashboard',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  declarations: [BookOfBussinesComponent, SearchCustomersComponent],
  exports: [BookOfBussinesComponent, SearchCustomersComponent],
  entryComponents: [BookOfBussinesComponent, SearchCustomersComponent],
  imports: [
    CommonModule,
    UrlModule,

    TableModule,
    LayoutGridModule,
    InputGroupModule,
    PanelModule,
    FormModule,

    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        SearchCustomersFlex: {
          component: SearchCustomersComponent,
        },
        BookOfBusinessFlex: {
          component: BookOfBussinesComponent,
        },
      },
    })
  ]
})
export class DashboardModule { }
