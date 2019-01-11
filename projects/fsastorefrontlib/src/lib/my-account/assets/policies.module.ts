import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { PoliciesComponent } from '../assets/components/policies/policies.component';
import { PolicyDetailsComponent } from '../assets/components/policy-details/policy-details.component';
import { PremiumCalendarComponent } from '../assets/components/premium-calendar/premium-calendar.component';
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
  declarations: [PoliciesComponent, PolicyDetailsComponent, PremiumCalendarComponent],
  exports: [PoliciesComponent, PolicyDetailsComponent, PremiumCalendarComponent],
  providers: [PolicyService, PolicyDataService, OccPolicyService]
})
export class PoliciesModule { }
