import { NgModule } from '@angular/core';
import { CMSViewPoliciesComponent } from './view-policies/view-policies.component';
import { CMSViewQuotesComponent } from './view-quotes/view-quotes.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { effects } from '../../my-account/assets/store';
import {LogoutModule} from "./logout/logout.module";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LogoutModule,
    EffectsModule.forFeature(effects)
  ],
  declarations: [ CMSViewPoliciesComponent, CMSViewQuotesComponent],
  exports: [ CMSViewPoliciesComponent, CMSViewQuotesComponent],
  entryComponents: [ CMSViewPoliciesComponent, CMSViewQuotesComponent]
})
export class AccountModule { }
