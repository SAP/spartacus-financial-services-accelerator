import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OccConfig } from '@spartacus/core';
import { PolicyService } from '../../../core/my-account/facade';

@Component({
  selector: 'cx-fs-premium-calendar',
  templateUrl: './premium-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PremiumCalendarComponent implements OnInit {
  constructor(
    protected config: OccConfig,
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
