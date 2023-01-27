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
import { LoanCalculatorComponent } from '../loan-calculator/loan-calculator.component';

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
        LoanCalculatorComponent: {
          component: LoanCalculatorComponent,
        },
        SearchResultsListComponent: {
          component: FSProductListComponent,
        },
      },
    }),
  ],
  declarations: [ProductFeatureComponent, FSProductListComponent],
  exports: [ProductFeatureComponent, FSProductListComponent],
  entryComponents: [ProductFeatureComponent, FSProductListComponent],
})
export class ProductModule {}
