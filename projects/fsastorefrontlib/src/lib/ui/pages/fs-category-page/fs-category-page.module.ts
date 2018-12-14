import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuards } from '@spartacus/storefront';
import { FSCategoryPageComponent } from './fs-category-page.component';
import { FSCategoryPageLayoutModule } from '../../layout/FS-category-page-layout/fs-category-page-layout.module';

const routes: Routes = [
  {
    path: 'Insurance-Products/:categoryTitle/c/:categoryCode',
    redirectTo: '/category/:categoryCode/:categoryTitle'
  },
  {
    path: 'Banking-Products/:categoryTitle/c/:categoryCode',
    redirectTo: '/category/:categoryCode/:categoryTitle'
  },
  {
    path: 'category/:categoryCode/:title',
    canActivate: [CmsPageGuards],
    component: FSCategoryPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FSCategoryPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FSCategoryPageComponent],
  exports: [FSCategoryPageComponent]
})
export class FSCategoryPageModule {
}
