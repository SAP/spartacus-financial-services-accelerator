import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { AuthGuard } from './../../../auth/guards/auth.guard';

import { OrderHistoryPageLayoutModule } from '../../layout/order-history-page-layout/order-history-page-layout.module';
import { OrderHistoryPageComponent } from './order-history-page.component';

const routes: Routes = [
  {
    path: 'my-account/orders',
    canActivate: [AuthGuard, CmsPageGuards],
    component: OrderHistoryPageComponent,
    data: { pageLabel: 'orders' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OrderHistoryPageLayoutModule
  ],
  declarations: [OrderHistoryPageComponent],
  exports: [OrderHistoryPageComponent]
})
export class OrderHistoryPageModule {}
