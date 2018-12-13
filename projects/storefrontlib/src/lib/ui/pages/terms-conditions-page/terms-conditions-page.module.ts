import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TermsConditionsLayoutModule } from './../../layout/terms-conditions-layout/terms-conditions-layout.module';
import { TermsConditionsPageComponent } from './terms-conditions-page.component';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

const routes: Routes = [
  {
    path: 'terms-and-conditions',
    canActivate: [CmsPageGuards],
    data: { pageLabel: 'termsAndConditions' },
    component: TermsConditionsPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    TermsConditionsLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TermsConditionsPageComponent],
  exports: [TermsConditionsPageComponent]
})
export class TermsConditionsPageModule {}
