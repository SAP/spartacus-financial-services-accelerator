import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuard } from '@spartacus/storefront';
import { AddOptionsPageLayoutModule } from '../../layout/add-options-page-layout/add-options-page-layout.module';
import { AddOptionsPageComponent } from './add-options-page.component';

const routes: Routes = [
  {
    path: 'add-options',
    canActivate: [CmsPageGuard],
    component: AddOptionsPageComponent,
    data: { pageLabel: 'cartPage' },
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
