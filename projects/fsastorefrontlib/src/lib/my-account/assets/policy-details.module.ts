import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuard } from '@spartacus/storefront';
import { AuthGuard, I18nModule } from '@spartacus/core';
import { PolicyDetailsComponent } from './components/policy-details/policy-details.component';
import { AccordionModule } from './../../accordion/accordion.module';

const routes: Routes = [
  {
    path: 'my-account/my-policies/:policyId/:contractId',
    canActivate: [AuthGuard, CmsPageGuard],
    data: { pageLabel: 'policy-details' },
    component: PolicyDetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    I18nModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ PolicyDetailsComponent ],
  exports: [ PolicyDetailsComponent ],
  entryComponents: [ PolicyDetailsComponent ]
})
export class PolicyDetailsModule { }
