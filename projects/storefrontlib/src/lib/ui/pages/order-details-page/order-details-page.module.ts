import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { OrderDetailsPageLayoutModule } from '../../layout/order-details-page-layout/order-details-page-layout.module';
import { OrderDetailsPageComponent } from './order-details-page.component';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { AuthGuard } from './../../../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'my-account/orders/:orderCode',
    canActivate: [AuthGuard, CmsPageGuards],
    component: OrderDetailsPageComponent,
    data: { pageLabel: 'order' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    OrderDetailsPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderDetailsPageComponent],
  exports: [OrderDetailsPageComponent]
})
export class OrderDetailsPageModule {}
