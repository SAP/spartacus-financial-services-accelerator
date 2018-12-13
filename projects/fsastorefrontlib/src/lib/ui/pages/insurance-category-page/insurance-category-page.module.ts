import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceCategoryPageComponent } from './insurance-category-page.component';
import { InsuranceCategoryPageLayoutModule } from '../../layout/insurance-category-page-layout/insurance-category-page-layout.module';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuards } from '@spartacus/storefront';

const routes: Routes = [
  {
    path: 'category/:categoryCode/:title',
    canActivate: [CmsPageGuards],
    component: InsuranceCategoryPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    InsuranceCategoryPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InsuranceCategoryPageComponent],
  exports: [InsuranceCategoryPageComponent]
})
export class InsuranceCategoryPageModule {
  
}
