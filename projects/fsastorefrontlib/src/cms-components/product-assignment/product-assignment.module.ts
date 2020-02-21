import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  MediaModule,
  PageLayoutComponent,
  CmsPageGuard,
} from '@spartacus/storefront';
import { ProductAssignmentsComponent } from './product-assignments/product-assignments.component';


@NgModule({
  imports: [
    CommonModule,
    MediaModule,
    I18nModule,
    UrlModule,
    ReactiveFormsModule,
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
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductAssignmentsFlex: {
          component: ProductAssignmentsComponent,
        }
      },
    }),
  ],
  declarations: [ProductAssignmentsComponent],
  exports: [ProductAssignmentsComponent],
  entryComponents: [ProductAssignmentsComponent]
})
export class ProductAssignmentModule { }
