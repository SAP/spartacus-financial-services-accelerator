import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuards } from '@spartacus/storefront';
import { AuthGuard } from '@spartacus/core';
import { AddOptionsPageComponent } from './add-options-page.component';
import { AddOptionsPageLayoutModule } from '../../layout/add-options-page-layout/add-options-page-layout.module';

const routes: Routes = [
  {
    path: 'add-options',
    canActivate: [AuthGuard, CmsPageGuards],
    component: AddOptionsPageComponent,
    data: { pageLabel: 'cartPage' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    AddOptionsPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddOptionsPageComponent],
  exports: [AddOptionsPageComponent]
})
export class AddOptionsPageModule { }
