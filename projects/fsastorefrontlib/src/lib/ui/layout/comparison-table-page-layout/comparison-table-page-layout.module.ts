import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsModule } from '@spartacus/storefront';
import { ComparisonTablePageLayoutComponent } from './comparison-table-page-layout.component';
import { ComparisonTableModule } from '../../../cms-lib/comparison-table/comparison-table.module';

@NgModule({
  imports: [CommonModule, CmsModule, ComparisonTableModule],
  declarations: [ComparisonTablePageLayoutComponent],
  exports: [ComparisonTablePageLayoutComponent]
})
export class ComparisonTablePageLayoutModule { }
