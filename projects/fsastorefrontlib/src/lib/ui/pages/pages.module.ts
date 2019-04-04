import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ContentPage
import { FSCategoryPageModule } from './fs-category-page/fs-category-page.module';
import { InboxPageModule } from './inbox-page/inbox-page.module';
import { QuotesReviewPageModule } from './quotes-review-page/quotes-review-page.module';
import { AddOptionsPageModule } from './add-options-page/add-options-page.module';
import { ComparisonTablePageModule } from './comparison-table-page/comparison-table-page.module';
import { CheckoutPageModule } from './checkout-page/checkout-page.module';

const pageModules = [
  FSCategoryPageModule,
  InboxPageModule,
  AddOptionsPageModule,
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
