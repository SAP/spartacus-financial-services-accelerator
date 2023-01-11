import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFeatureComponent } from './product-feature/product-feature.component';
import {
  ConfigModule,
  CmsConfig,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { FSProductListComponent } from './product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { MediaModule, ListNavigationModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    RouterModule,
    MediaModule,
    ListNavigationModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        FinancialServicesProductFeatureComponent: {
          component: ProductFeatureComponent,
        },
        SearchResultsListComponent: {
          component: FSProductListComponent,
        },
      },
    }),
  ],
  declarations: [ProductFeatureComponent, FSProductListComponent],
  exports: [ProductFeatureComponent, FSProductListComponent],
})
export class ProductModule {}
