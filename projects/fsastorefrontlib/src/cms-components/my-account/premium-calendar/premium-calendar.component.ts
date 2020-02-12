import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';
import * as fromStore from '../../../core/my-account/store';
import { PolicyService } from '../../../core/my-account/facade';

@Component({
  selector: 'fsa-premium-calendar',
  templateUrl: './premium-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PremiumCalendarComponent implements OnInit {
  constructor(
    private config: OccConfig,
    protected policyService: PolicyService
  ) {}

  policies$;
  policiesLoaded$;
  opened = false;

  ngOnInit() {
    this.policyService.loadPremiumCalendar();
    this.policies$ = this.policyService.getPremiumCalendar();
    this.policiesLoaded$ = this.policyService.getPremiumCalendarLoaded();
  }

  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }
}
