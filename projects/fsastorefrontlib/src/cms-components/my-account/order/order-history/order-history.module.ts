import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { ListNavigationModule } from '@spartacus/storefront';
import { FSOrderHistoryComponent } from './order-history.component';

@NgModule({
  imports: [
    CommonModule,
    // RouterModule.forChild([
    //   {
    //     path: null,
    //     canActivate: [AuthGuard, CmsPageGuard],
    //     component: PageLayoutComponent,
    //     data: { cxRoute: 'orders' },
    //   },
    // ]),
    RouterModule,
    FormsModule,
    NgSelectModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
  ],
  declarations: [FSOrderHistoryComponent],
  exports: [FSOrderHistoryComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountFSOrderHistoryComponent: {
          component: FSOrderHistoryComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  entryComponents: [FSOrderHistoryComponent],
})
export class OrderHistoryModule {}
