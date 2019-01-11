import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as fromPolicyStore from '../../store';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';

@Component({
  selector: 'fsa-premium-calendar',
  templateUrl: './premium-calendar.component.html',
  styleUrls: ['./premium-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PremiumCalendarComponent implements OnInit {
  constructor(
    private store: Store<fromPolicyStore.UserState>,
    private config: OccConfig
  ) {}

  policies$;
  policiesLoaded$;

  noPoliciesText = 'You have no Policies!';

  ngOnInit() {
    this.policies$ = this.store.pipe(select(fromPolicyStore.getPolicyData));
    this.policiesLoaded$ = this.store.pipe(select(fromPolicyStore.getPoliciesLoaded));
  }

  public getBaseUrl() {
    return this.config.server.baseUrl || '';
  }
}
