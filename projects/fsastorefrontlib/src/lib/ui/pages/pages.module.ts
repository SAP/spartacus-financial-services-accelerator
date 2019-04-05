import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ContentPage
import { FSCategoryPageModule } from './fs-category-page/fs-category-page.module';
import { QuotesReviewPageModule } from './quotes-review-page/quotes-review-page.module';
import { ComparisonTablePageModule } from './comparison-table-page/comparison-table-page.module';
import { CheckoutPageModule } from './checkout-page/checkout-page.module';

const pageModules = [
  FSCategoryPageModule,
  QuotesReviewPageModule,
  ComparisonTablePageModule,
  CheckoutPageModule
];

@NgModule({
  imports: [CommonModule, ...pageModules],
  declarations: [],
  exports: [...pageModules]
})
export class PagesModule {}
