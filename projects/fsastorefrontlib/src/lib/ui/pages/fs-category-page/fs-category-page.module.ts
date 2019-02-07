import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent, CmsPageGuards, PageLayoutModule } from '@spartacus/storefront';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: CategoryPageComponent,
    data: { cxPath: 'category' }
  },
  {
    path: 'Insurance-Products/:categoryTitle/c/:categoryCode',
    redirectTo: null,
    data: { cxRedirectTo: 'category' }
  },
  {
    path: 'Banking-Products/:categoryTitle/c/:categoryCode',
    redirectTo: null,
    data: { cxRedirectTo: 'category' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageLayoutModule
  ]
})
export class FSCategoryPageModule {
}
