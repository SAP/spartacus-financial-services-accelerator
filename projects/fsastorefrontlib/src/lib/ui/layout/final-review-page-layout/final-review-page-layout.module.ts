import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FinalReviewPageLayoutComponent} from './final-review-page-layout.component';
import {CheckoutModule} from '../../../checkout';


@NgModule({
  imports: [CommonModule, CheckoutModule],
  declarations: [FinalReviewPageLayoutComponent],
  exports: [FinalReviewPageLayoutComponent],
  providers: [
  ]
})
export class FinalReviewPageLayoutModule { }
