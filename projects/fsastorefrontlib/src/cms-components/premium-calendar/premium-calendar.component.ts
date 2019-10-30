import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';
import * as fromStore from '../../core/myaccount/store';
import { PolicyService } from '../../core/myaccount/services';

@Component({
  selector: 'fsa-premium-calendar',
  templateUrl: './premium-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PremiumCalendarComponent implements OnInit {
  constructor(
    private store: Store<fromStore.UserState>,
    private config: OccConfig,
    protected policyService: PolicyService
  ) {}

  policies$;
  policiesLoaded$;
  opened = false;

  ngOnInit() {
    this.policyService.loadPremiumCalendar();
    this.policies$ = this.store.pipe(select(fromStore.getPremiumCalendarData));
    this.policiesLoaded$ = this.store.pipe(
      select(fromStore.getPremiumCalendarLoaded)
    );
  }

  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }
}
