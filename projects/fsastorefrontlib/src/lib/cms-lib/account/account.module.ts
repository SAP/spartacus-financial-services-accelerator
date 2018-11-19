import { NgModule } from '@angular/core';
import { CMSViewPoliciesComponent } from './view-policies/view-policies.component';
import { CMSViewQuotesComponent } from './view-quotes/view-quotes.component';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports:[CommonModule, RouterModule],
  declarations: [ CMSViewPoliciesComponent, CMSViewQuotesComponent],
  exports: [ CMSViewPoliciesComponent, CMSViewQuotesComponent],
  entryComponents: [ CMSViewPoliciesComponent, CMSViewQuotesComponent]
})
export class AccountModule { }