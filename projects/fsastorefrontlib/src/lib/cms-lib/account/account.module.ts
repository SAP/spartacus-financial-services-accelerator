import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { CMSViewPoliciesComponent } from './view-policies/view-policies.component';
import { CMSViewQuotesComponent } from './view-quotes/view-quotes.component';
import { effects } from '../../my-account/assets/store';

import { ComponentsModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature(effects),
    ComponentsModule
  ],
  declarations: [ CMSViewPoliciesComponent, CMSViewQuotesComponent],
  exports: [ CMSViewPoliciesComponent, CMSViewQuotesComponent],
  entryComponents: [ CMSViewPoliciesComponent, CMSViewQuotesComponent]
})
export class AccountModule { }
