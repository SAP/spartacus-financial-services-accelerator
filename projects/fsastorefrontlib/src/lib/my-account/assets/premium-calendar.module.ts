import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { ComponentsModule } from '@spartacus/storefront';
import { PremiumCalendarComponent } from './components/premium-calendar/premium-calendar.component';
import { PremiumCalendarService } from './services/premium-calendar.service';
import { OccPolicyService } from '../../occ/policy/policy.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    ComponentsModule
  ],
  declarations: [PremiumCalendarComponent],
  exports: [PremiumCalendarComponent],
  providers: [PremiumCalendarService, OccPolicyService]
})
export class PremiumCalendarModule {}
