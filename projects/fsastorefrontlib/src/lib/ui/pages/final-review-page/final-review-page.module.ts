import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuard } from '@spartacus/storefront';
import { FinalReviewPageLayoutModule } from '../../layout/final-review-page-layout/final-review-page-layout.module';
import { FinalReviewPageComponent } from './final-review-page.component';

const routes: Routes = [
  {
    path: 'final-review',
    canActivate: [CmsPageGuard],
    component: FinalReviewPageComponent,
    data: { pageLabel: 'cartPage' },
  }
];

@NgModule({
  imports: [
    CommonModule,
    FinalReviewPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FinalReviewPageComponent],
  exports: [FinalReviewPageComponent]
})
export class FinalReviewPageModule { }
