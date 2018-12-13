import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsModule } from '@spartacus/storefront';
import { InsuranceCategoryPageLayoutComponent } from './insurance-category-page-layout.component';

@NgModule({
  imports: [CommonModule, CmsModule],
  declarations: [InsuranceCategoryPageLayoutComponent],
  exports: [InsuranceCategoryPageLayoutComponent]
})
export class InsuranceCategoryPageLayoutModule {}
