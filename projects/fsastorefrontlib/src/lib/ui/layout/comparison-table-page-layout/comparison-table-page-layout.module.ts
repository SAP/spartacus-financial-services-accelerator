import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsModule } from '@spartacus/storefront';
import {ComparisonTablePageLayoutComponent} from './comparison-table-page-layout.component';
import {CheckoutModule} from '../../../cms-lib/checkout/checkout.module';

@NgModule({
  imports: [CommonModule, CmsModule, CheckoutModule],
  declarations: [ComparisonTablePageLayoutComponent],
  exports: [ComparisonTablePageLayoutComponent]
})
export class ComparisonTablePageLayoutModule {}
