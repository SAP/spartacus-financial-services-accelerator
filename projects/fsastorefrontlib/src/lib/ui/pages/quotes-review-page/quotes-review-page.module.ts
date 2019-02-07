import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesReviewPageComponent } from './quotes-review-page.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@spartacus/core';
import { CmsPageGuards } from '@spartacus/storefront';

const routes: Routes = [
  {
    path: 'quotes-review',
    canActivate: [AuthGuard, CmsPageGuards],
    component: QuotesReviewPageComponent,
    data: { pageLabel: 'multiStepCheckoutSummaryPage' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuotesReviewPageComponent],
  exports: [QuotesReviewPageComponent]
})

export class QuotesReviewPageModule { }
