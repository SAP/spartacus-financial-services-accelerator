import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsModule } from '@spartacus/storefront';
import { FSCategoryPageLayoutComponent } from './fs-category-page-layout.component';

@NgModule({
  imports: [CommonModule, CmsModule],
  declarations: [FSCategoryPageLayoutComponent],
  exports: [FSCategoryPageLayoutComponent]
})
export class FSCategoryPageLayoutModule {}
