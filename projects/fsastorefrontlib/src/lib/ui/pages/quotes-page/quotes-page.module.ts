import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuard } from '@spartacus/storefront';
import { AuthGuard } from '@spartacus/core';
import { QuotesPageLayoutModule } from '../../layout/quotes-page-layout/quotes-page-layout.module';
import { QuotesPageComponent } from './quotes-page.component';

const routes: Routes = [
  {
    path: 'my-account/my-financial-applications',
    canActivate: [AuthGuard, CmsPageGuard],
    component: QuotesPageComponent,
    data: { pageLabel: 'my-quotes' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    QuotesPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuotesPageComponent],
  exports: [QuotesPageComponent]
})

export class QuotesPageModule { }
