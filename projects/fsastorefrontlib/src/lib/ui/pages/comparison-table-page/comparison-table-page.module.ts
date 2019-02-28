import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuards } from '@spartacus/storefront';
import { ComparisonTablePageLayoutModule } from '../../layout/comparison-table-page-layout/comparison-table-page-layout.module';
import { ComparisonTablePageComponent } from './comparison-table-page.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuards],
    component: ComparisonTablePageComponent,
    data: { cxPath: 'comparisonTable' }
  },
  {
    path: 'Insurance-Products/:categoryTitle/:categoryType/c/:categoryCode',
    canActivate: [CmsPageGuards],
    redirectTo: null,
    data: { cxRedirectTo: 'comparisonTable' }
  }
];
@NgModule({
  imports: [
    CommonModule,
    ComparisonTablePageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComparisonTablePageComponent],
  exports: [ComparisonTablePageComponent]
})
export class ComparisonTablePageModule { }
