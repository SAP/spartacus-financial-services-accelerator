import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { InboxComponent } from '../assets/components/inbox/inbox.component';
import { PolicyService } from './services/policy.service';
import { PolicyDataService } from './services/policy-data.service';
import { OccPolicyService } from '../../occ/policy/policy.service';
import { AccordionModule } from './../../accordion/accordion.module';

import { ComponentsModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    AccordionModule,
    ComponentsModule
  ],
  declarations: [InboxComponent],
  exports: [InboxComponent],
  providers: [PolicyService, PolicyDataService, OccPolicyService]
})
export class InboxModule { }
