import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  CmsPageGuard,
  MediaModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { AdministrationModule } from '@spartacus/organization';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { ProductAssignmentStoreModule } from '../../../core/product-assignment/store/product-assignments-store.module';
import { ActiveProductAssignmentsComponent } from './active-product-assignments/active-product-assignments.component';
import { ProductAssignmentItemComponent } from './product-assignment-item/product-assignment-item.component';
import { ProductAssignmentsComponent } from './product-assignments/product-assignments.component';
import { PotentialProductAssignmentsComponent } from './potential-product-assignments/potential-product-assignments.component';

@NgModule({
  imports: [
    CommonModule,
    MediaModule,
    I18nModule,
    UrlModule,
    ReactiveFormsModule,
    ProductAssignmentStoreModule,
    AdministrationModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        data: {
          cxRoute: 'productAssignment',
          pageLabel: 'productAssignmentsPage',
        },
        component: PageLayoutComponent,
      },
      {
        path: null,
        canActivate: [CmsPageGuard],
        data: {
          cxRoute: 'productActivation',
          pageLabel: 'productActivationPage',
        },
        component: PageLayoutComponent,
      },
      {
        path: null,
        canActivate: [CmsPageGuard],
        data: {
          cxRoute: 'unitDetails',
          pageLabel: 'orgUnitDetailsPage',
        },
        component: PageLayoutComponent,
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductAssignmentsFlex: {
          component: ProductAssignmentsComponent,
          guards: [AuthGuard, AdminGuard],
        },
        PotentialProductAssignmentsFlex: {
          component: PotentialProductAssignmentsComponent,
          guards: [AuthGuard, AdminGuard],
        },
        ActiveProductAssignmentsFlex: {
          component: ActiveProductAssignmentsComponent,
          guards: [AuthGuard, AdminGuard],
        },
      },
    }),
  ],
  declarations: [
    ProductAssignmentsComponent,
    PotentialProductAssignmentsComponent,
    ActiveProductAssignmentsComponent,
    ProductAssignmentItemComponent,
  ],
  exports: [
    ProductAssignmentsComponent,
    PotentialProductAssignmentsComponent,
    ActiveProductAssignmentsComponent,
    ProductAssignmentItemComponent,
  ],
  entryComponents: [
    ProductAssignmentsComponent,
    PotentialProductAssignmentsComponent,
    ActiveProductAssignmentsComponent,
    ProductAssignmentItemComponent,
  ],
})
export class ProductAssignmentModule {}
