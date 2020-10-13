import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { OccConfig } from '@spartacus/core';
import { PolicyService } from '../../../core/my-account/facade';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-fs-premium-calendar',
  templateUrl: './premium-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PremiumCalendarComponent implements OnInit, OnDestroy {
  constructor(
    protected config: OccConfig,
    protected policyService: PolicyService
  ) {}

  policiesLoaded$;
  policies = [];

  private subscription = new Subscription();

  ngOnInit() {
    this.policyService.loadPremiumCalendar();
    this.policiesLoaded$ = this.policyService.getPremiumCalendarLoaded();
    this.getInsurancePolicies();
  }

  getInsurancePolicies() {
    this.subscription.add(
      this.policyService
        .getPremiumCalendar()
        .pipe(
          map(policies => {
            const policyList = <any>policies;
            if (policyList?.insurancePolicies) {
              policyList.insurancePolicies.map(policy => {
                this.policies.push({ ...policy });
              });
            }
          })
        )
        .subscribe()
    );
  }

  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  openPolicy(policy) {
    policy.opened = !policy.opened;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
