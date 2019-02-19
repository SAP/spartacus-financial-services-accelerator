import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CmsPageGuards} from '@spartacus/storefront';
import {AuthGuard} from '@spartacus/core';
import {ComparisonTablePageComponent} from './comparison-table-page.component';
import {ComparisonTablePageLayoutModule} from '../../layout/comparison-table-page-layout/comparison-table-page-layout.module';

const routes: Routes = [
  {
    path: 'comparison-table',
    canActivate: [AuthGuard, CmsPageGuards],
    component: ComparisonTablePageComponent,
    data: { pageLabel: 'account' }
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
