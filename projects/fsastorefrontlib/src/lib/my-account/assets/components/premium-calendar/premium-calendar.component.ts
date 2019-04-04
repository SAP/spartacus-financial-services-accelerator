import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';
import * as fromStore from '../../store';
import { PolicyService } from '../../services';

@Component({
  selector: 'fsa-premium-calendar',
  templateUrl: './premium-calendar.component.html',
  styleUrls: ['./premium-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PremiumCalendarComponent implements OnInit {
  constructor(
    private store: Store<fromStore.UserState>,
    private config: OccConfig,
    protected policyService: PolicyService
  ) {}

  policies$;
  policiesLoaded$;

  ngOnInit() {
    this.policyService.loadPremiumCalendar();
    this.policies$ = this.store.pipe(select(fromStore.getPremiumCalendarData));
    this.policiesLoaded$ = this.store.pipe(select(fromStore.getPremiumCalendarLoaded));
  }

  public getBaseUrl() {
    return this.config.server.baseUrl || '';
  }
}
