import { ProductAssignmentStoreModule } from './../../core/product-assignment/store/product-assignments-store.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
  AuthGuard,
} from '@spartacus/core';
import {
  MediaModule,
  PageLayoutComponent,
  CmsPageGuard,
} from '@spartacus/storefront';
import { ProductAssignmentsComponent } from './product-assignments/product-assignments.component';
import { ActiveProductsComponent } from './unit-details/active-products.component';

@NgModule({
  imports: [
    CommonModule,
    MediaModule,
    I18nModule,
    UrlModule,
    ReactiveFormsModule,
    ProductAssignmentStoreModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        data: {
          cxRoute: 'productAssignments',
          pageLabel: 'productAssignmentsPage',
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
        },
        ActiveProductsFlex: {
          component: ActiveProductsComponent,
        },
      },
    }),
  ],
  declarations: [ProductAssignmentsComponent, ActiveProductsComponent],
  exports: [ProductAssignmentsComponent, ActiveProductsComponent],
  entryComponents: [ProductAssignmentsComponent, ActiveProductsComponent],
})
export class ProductAssignmentModule {}
