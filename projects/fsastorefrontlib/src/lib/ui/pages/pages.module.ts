import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ContentPage
import { QuotesPageModule } from './quotes-page/quotes-page.module';
import { PoliciesPageModule } from './policies-page/policies-page.module';
import { ClaimsPageModule } from './claims-page/claims-page.module';
import { PolicyDetailsPageModule } from './policy-details-page/policy-details-page.module';
import { PremiumCalendarPageModule } from './premium-calendar-page/premium-calendar-page.module';
import { FSCategoryPageModule } from './fs-category-page/fs-category-page.module';
import { InboxPageModule } from './inbox-page/inbox-page.module';
import { QuotesReviewPageModule } from './quotes-review-page/quotes-review-page.module';
import { AddOptionsPageModule } from './add-options-page/add-options-page.module';
import {ComparisonTablePageModule} from './comparison-table-page/comparison-table-page.module';

const pageModules = [
    QuotesPageModule,
    PoliciesPageModule,
    ClaimsPageModule,
    PolicyDetailsPageModule,
    PremiumCalendarPageModule,
    FSCategoryPageModule,
    InboxPageModule,
    AddOptionsPageModule,
    QuotesReviewPageModule,
    ComparisonTablePageModule
];

@NgModule({
    imports: [CommonModule, ...pageModules],
    declarations: [],
    exports: [...pageModules]
})

export class PagesModule {
}
