import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
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
import { ProductAssignmentStoreModule } from './../../core/product-assignment/store/product-assignments-store.module';
import { ProductAssignmentsComponent } from './product-assignments/product-assignments.component';
import { ActiveProductAssignmentsComponent } from './active-product-assignments/active-product-assignments.component';
import { ProductAssignmentItemComponent } from './product-assignment-item/product-assignment-item.component';

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
          component: ActiveProductAssignmentsComponent,
        },
      },
    }),
  ],
  declarations: [
    ProductAssignmentsComponent,
    ActiveProductAssignmentsComponent,
    ProductAssignmentItemComponent,
  ],
  exports: [
    ProductAssignmentsComponent,
    ActiveProductAssignmentsComponent,
    ProductAssignmentItemComponent,
  ],
  entryComponents: [
    ProductAssignmentsComponent,
    ActiveProductAssignmentsComponent,
    ProductAssignmentItemComponent,
  ],
})
export class ProductAssignmentModule {}
