import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuards } from '@spartacus/storefront';
import { AuthGuard } from '@spartacus/core';
import { ClaimsPageComponent } from './claims-page.component';
import { ClaimsPageLayoutModule } from '../../layout/claims-page-layout/claims-page-layout.module';

const routes: Routes = [
  {
    path: 'my-account/my-insurance-claims',
    canActivate: [AuthGuard, CmsPageGuards],
    component: ClaimsPageComponent,
    data: { pageLabel: 'my-claims' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    ClaimsPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClaimsPageComponent],
  exports: [ClaimsPageComponent]
})
export class ClaimsPageModule {
}
