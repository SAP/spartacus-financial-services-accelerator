import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@spartacus/core';
import { CmsPageGuards } from '@spartacus/storefront';

import { QuotesReviewPageComponent } from './quotes-review-page.component';
import { CheckoutModule } from '../../../checkout';

const routes: Routes = [
  {
    path: 'quote-review',
    canActivate: [AuthGuard, CmsPageGuards],
    component: QuotesReviewPageComponent,
    data: { pageLabel: 'multiStepCheckoutSummaryPage' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    CheckoutModule,
    RouterModule.forChild(routes),
  ],
  declarations: [QuotesReviewPageComponent],
  exports: [QuotesReviewPageComponent]
})

export class QuotesReviewPageModule { }
