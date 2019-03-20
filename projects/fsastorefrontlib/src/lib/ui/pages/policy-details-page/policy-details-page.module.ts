import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuard } from '@spartacus/storefront';
import { AuthGuard } from '@spartacus/core';
import { PolicyDetailsPageLayoutModule } from '../../layout/policy-details-page-layout/policy-details-page-layout.module';
import { PolicyDetailsPageComponent } from './policy-details-page.component';

const routes: Routes = [
  {
    path: 'my-account/my-policies/:policyId/:contractId',
    canActivate: [AuthGuard, CmsPageGuard],
    component: PolicyDetailsPageComponent,
    data: { pageLabel: 'policy-details' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    PolicyDetailsPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PolicyDetailsPageComponent],
  exports: [PolicyDetailsPageComponent]
})
export class PolicyDetailsPageModule { }
