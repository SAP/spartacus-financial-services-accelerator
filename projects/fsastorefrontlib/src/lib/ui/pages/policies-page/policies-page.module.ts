import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuards } from '@spartacus/storefront';
import { AuthGuard } from '@spartacus/core';
import { PoliciesPageLayoutModule } from '../../layout/policies-page-layout/policies-page-layout.module';
import { PoliciesPageComponent } from './policies-page.component';

const routes: Routes = [
  {
    path: 'my-account/my-policies',
    canActivate: [AuthGuard, CmsPageGuards],
    component: PoliciesPageComponent,
    data: { pageLabel: 'my-policies' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    PoliciesPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PoliciesPageComponent],
  exports: [PoliciesPageComponent]
})
export class PoliciesPageModule { }
